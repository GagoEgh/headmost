import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { switchMap, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { PromoCodeResults } from 'src/app/modeles/order-response.modele';
import { CardItemResults } from 'src/app/modeles/frame-response.modele';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { OrderService } from './order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderDto } from 'src/app/modeles/orderDto';
import { NgxSpinnerService } from "ngx-spinner";

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
  public shiping!: any[];
  public promoId: null | number = null;
  public sumInit: number = 0;
  private count: number = 0;
  public matcher = new MyErrorStateMatcher();
  private userName: string = '';

  constructor(
    public frames: FramesServService,
    private fb: FormBuilder,
    public modalService: NgbModal,
    public orderService: OrderService,
    public _translate: TranslateService,
    public toastr: ToastrService,
    public valid: ValidationServService,
    public router: Router,
    private spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.userName = this.frames?.userData?.user_details?.first_name;
    this.getResponsesDate()
    this.getOrder();
    this.orderService.isdisible = false;
    this.frames.isMyOrder = false;
    this.frames.sum = this.sumInit > this.frames.sum ? this.sumInit : this.frames.sum
    this.orderFormValidation();
    this.addSum()
  }

  getResponsesDate() {
    forkJoin({
      cityPlaceholder: this.frames.cityPlaceholder(),
      userCountry: this.frames.getCountry(),
      shiping: this.orderService.shipingMethod(),
    })
      .pipe(takeUntil(this._subscribe$))
      .subscribe({
        next: (response) => {
          this.frames.country_placeholder = response.cityPlaceholder;
          this.frames.selectedValue = response.userCountry.results;
          this.shiping = response.shiping.results;

        }
      })
  }

  getOrder() {
    this.frames.getOrdersDate()
      .pipe(takeUntil(this._subscribe$))
      .subscribe({
        next: (res: any) => {
          if (res) {
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
      email: [this.frames?.userData?.user_details?.username, [Validators.required, this.valid.emailValid]],
      phoneNumber: [this.frames?.userData?.phone_number, [Validators.required, this.valid.PhoneNumberLength]],
      country: [this.frames?.userData?.city, [Validators.required]],
      addres: [this.frames?.userData?.address, [Validators.required]],
      shipping: [null, [Validators.required]],
      comment: [''],
      sale: ['', [this.noText, Validators.maxLength(3)]],
      postal: ['', [Validators.maxLength(20), Validators.required]]
    });
  }

  private addSum(): void {
    this.sumInit = 0;
    this.frames.sum = 0;
    this.frames?.orderList?.forEach((card: CardItemResults) => {
      this.sumInit += card.created_frame_details.price;
      this.frames.sum = this.sumInit
    })

  }

  private noText(control: FormControl): object | null {
    const regExp = /[0-9]/;
    if (control.value && !regExp.test(control.value)) {
      return {
        noText: true
      }
    }
    return null
  }

  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const ids: number[] = [];
    this.frames.orderList.forEach((card: CardItemResults) => {
      ids.push(card.created_frame)
    })

    const dto = {
      form: this.validateForm.value,
      id: this.promoId,
      sum: this.frames.sum,
      ids
    }
    const order = new OrderDto(dto);

    if (this.validateForm.valid) {
      this.userName = order.full_name;
      this.goUsOrder(order)
    }

  }

  private goUsOrder(order: OrderDto): void {
    let okMsg: string = '';
    let errMsg: string = '';
    this._translate.get('Menu.user')
      .pipe(takeUntil(this._subscribe$))
      .subscribe(
        {
          next: (res) => {
            okMsg = res.orderOk;
            errMsg = res.orderErr;
            this.validForm(order, okMsg, errMsg)
          }
        }
      )

  }

  private validForm(order: OrderDto, ok: string, err: string) {
    if (this.validateForm?.valid) {

      this.orderService.userOrder(order)
        .pipe(takeUntil(this._subscribe$))
        .subscribe(
          (order: any) => {
            this.count!++;
            this.orderService.isdisible = true;
            this.toastr.success(ok);
            setTimeout(() => {
              let a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.href = order.message.formUrl;
              a.click();
              document.body.removeChild(a)
            }, 1500)

          },
          (err) => {
            setTimeout(() => {
              this.orderService.errOrder(err)
              this.toastr.error(err)
            }, 1000)

          })
    }
  }

  public salePost(event: Event): void {
    this.validateForm.get('sale')?.setValue((event.target as HTMLInputElement).value)
    const sale = {
      price: this.frames.sum,
      code: this.validateForm.get('sale')?.value
    }

    if (this.validateForm.get('sale')?.value.length === 6 &&
      this.promoId === null && this.validateForm.get('sale')?.valid) {
      this.orderService.promoCodePost(sale)
        .pipe(takeUntil(this._subscribe$))
        .subscribe((promoCode: PromoCodeResults) => {
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
    
    this.orderService.deleteOrder(card.id)
      .pipe(takeUntil(this._subscribe$),
        switchMap(() => {
          this.spinner.show();
          return this.frames.getUserOrder(this.frames.userData.user)
        })
      ).subscribe({
        next: (res: any) => {
        
          this.sumInit = 0;
          if (this.frames.orderList.length === 0) {
            this.frames.showFrame()
          }
          this.frames.orderList = res.results.reverse();
          this.addSum();
           this.spinner.hide()
        }
      })
      
  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}

