import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { PromoCodeResults, ShipingResult } from 'src/app/modeles/order-response.modele';
import { CardItemResults } from 'src/app/modeles/frame-response.modele';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { OrderService } from './order.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewChecked {
  public validateForm: FormGroup = new FormGroup({});
  public _subscribe$ = new Subject();
  public erroreStr: string = '';
  public promoError: string = '';
  public shiping: any[] = [];
  public promoId: null | number = null;
  private sumInit: number = 0;
  private count: number = 0;
  public matcher = new MyErrorStateMatcher();
  private userName: string = '';
  constructor(public frames: FramesServService, private fb: FormBuilder, public modalService: NgbModal,
    public orderService: OrderService, public _translate: TranslateService, public toastr: ToastrService,
    public valid: ValidationServService,public router: Router,) {
  }

  ngOnInit(): void {
    this.userName = this.frames.userData.user_details.first_name;
    this.frames.cityPlaceholder()
    this.orderService.isdisible = false;
    this.frames.isMyOrder = false;
    this.shipingGet();
     
    this.frames.sum = this.sumInit > this.frames.sum ? this.sumInit : this.frames.sum
    this.frames.userCountry();
    this.orderFormValidation();
    this.getOrder()
  }

  getOrder(){
    this.frames.getOrdersDate()
    .pipe(takeUntil(this._subscribe$))
    .subscribe({
      next:(res:any)=>{
        if(res){
          this.addSum();
        }
      }
    })
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.frames.cityPlaceholder()
  }

  private orderFormValidation(): void {
    this.validateForm = this.fb.group({
      frstName: [this.userName, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      email: [this.frames.userData.user_details.username, [Validators.required, this.valid.emailValid]],
      phoneNumber: [this.frames.userData.phone_number, [Validators.required, this.valid.PhoneNumberLength]],
      country: [this.frames.userData.city, [Validators.required]],
      addres: [this.frames.userData.address, [Validators.required]],
      shipping: [null, [Validators.required]],
      comment: ['', [Validators.maxLength(20)]],
      sale: ['', [Validators.maxLength(6), this.noText]],
      postal: ['', [Validators.maxLength(20), Validators.required]]
    });
  }

  private addSum(): void {
    this.frames.orderList.forEach((card: CardItemResults) => {
      this.sumInit += card.created_frame_details.price;
    })
  }

  private shipingGet(): void {
    this.orderService.shipingMethod().pipe(takeUntil(this._subscribe$)).subscribe((shipings: ServerResponce<ShipingResult[]>) => {
      this.shiping = shipings.results;
    })
  }

  private noText(control: FormControl): object | null {
    const regExp = /[a-zA-Z]/;
    if (regExp.test(control.value)) {
      return {
        noText: true
      }
    }
    return null
  }

  public submitForm(): void {
    console.log(this.validateForm.get('postal')?.errors?.maxlength?.requiredLength)
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
   
    const ids: number[] = [];
    this.frames.orderList.forEach((card: CardItemResults) => {
      ids.push(card.created_frame)
    })

    const order = {
      full_name: this.validateForm.get('frstName')?.value,
      shipping_method: this.validateForm.get('shipping')?.value,
      phone_number: this.validateForm.get('phoneNumber')?.value,
      email: this.validateForm.get('email')?.value,
      city: this.validateForm.get('country')?.value,
      address: this.validateForm.get('addres')?.value,
      price: this.frames.sum,
      comment: this.validateForm.get('comment')?.value,
      promo_code: this.promoId,
      order_items: ids,
      postal_code: this.validateForm.get('postal')?.value,
    }
  
    if (this.validateForm.valid) {
      this.userName = order.full_name;
      this.goUsOrder(order)
    }

  }

  private goUsOrder(order:any): void {
    let okMsg: string = '';
    let errMsg: string = '';
    this._translate.get('Menu.user').subscribe((el) => {
      okMsg = el.orderOk;
      errMsg = el.orderErr
    })

    if (this.validateForm?.valid && this.count != 1) {
      //  ServerResponce<OrderResult[]>
      this.orderService.userOrder(order).pipe(takeUntil(this._subscribe$)).subscribe((order: any) => {
        this.toastr.success(okMsg);
        this.count!++;
        this.orderService.isdisible = true;
        // this.router.navigate(['user/user-order']);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        a.href = order.message.formUrl;
        a.click();
        document.body.removeChild(a)
      }, (err) => {
        this.orderService.errOrder(errMsg)
      })
    }
  }

  public salePost(event: Event): void {
    this.validateForm.get('sale')?.setValue((event.target as HTMLInputElement).value)
    const sale = {
      price: this.frames.sum,
      code: this.validateForm.get('sale')?.value
    }

    if (this.validateForm.get('sale')?.value.length === 6 && this.promoId === null && this.validateForm.get('sale')?.valid) {
      this.orderService.promoCodePost(sale).pipe(takeUntil(this._subscribe$)).subscribe((promoCode: PromoCodeResults) => {
        this.frames.sum = promoCode.discounted_price;
        this.promoId = promoCode.promo_code.id;
        this.promoError = '';
      },
        (error: HttpErrorResponse) => {
          this.promoError = error.error.message;
        })
    }
  }

  public deleteDate(card: CardItemResults): void {
    this.orderService.deleteOrder(card.id).pipe(takeUntil(this._subscribe$)).subscribe(() => {
      this.frames.sum -= card.created_frame_details.price;
      this.frames.orderList = this.frames.orderList.filter((val: CardItemResults) => {
        return val.id != card.id
      })
      if (this.frames.orderList.length === 0) {
        this.frames.showFrame()
      }
    });
  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}

