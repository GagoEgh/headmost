import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OkoderComponent } from '../okoder/okoder.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PromoCodeResults, ServerResponce } from 'src/app/interface/img-ramka';
import { ShipingResult } from 'src/app/interface/order-response';
import { CardItemResults } from 'src/app/interface/frame-response';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewChecked {
  public validateForm: FormGroup = new FormGroup({});
  public _subscribe$ = new Subject();
  public erroreStr: string = '';
  private heigth: number | undefined;
  private width: number | undefined;
  public promoError: string = '';
  public shiping: any[] = [];
  public _frstName: string = '';
  public _brtDay: string = '';
  public _email: string = '';
  public _phoneNumber: string = '';
  public _country: string = '';
  public _addres: string = '';
  public _sale: string = '';
  public _shipping: string = '';
  public __addresPost: string = '';
  public _comment: string = '';
  public _btnOrder: string = ''
  public titleH1: string = '';
  public titleH2: string = '';
  public title: string = '';
  public _imgLength: string = '';
  public _letterSum: string = '';
  public _price: string = '';
  public _addSum: string = '';
  public _carzin: string = '';
  public ship: string = '';
  public sahleLengt: number = 0;
  public scale: number = 1;
  public promoId:null|number = null;
  private sumInit: number = 0;
  private count: number = 0;

  @ViewChild("wrap", { static: false }) wrap: ElementRef | undefined;

  constructor(public frames: FramesServService, private fb: FormBuilder, public modalService: NgbModal,
    public _translate: TranslateService, public valid: ValidationServService) {

  }

  ngOnInit(): void {
    this.frames.cityPlaceholder()
    this.changeJson()
    this.frames.isdisible = false;
    setTimeout(() => {
      this.frames.isMyOrder = false;
    })


    this.frames.shipingMethod().pipe(takeUntil(this._subscribe$)).subscribe((shiping: ServerResponce<ShipingResult[]>) => {
      this.shiping = shiping.results;

    })

    this.frames.orderList.forEach((obj: any) => {
      this.sumInit += obj.created_frame_details.price;
    })

    this.frames.sum = this.sumInit > this.frames.sum ? this.sumInit : this.frames.sum

    this.frames.userCountry();
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      email: [null, [Validators.required, this.valid.emailValid]],
      phoneNumber: [null, [Validators.required, this.valid.PhoneNumberLength]],
      country: [null, [Validators.required]],
      addres: [null, [Validators.required]],
      shipping: [null, [Validators.required]],
      comment: ['', [Validators.maxLength(20)]],
      sale: ['', [Validators.maxLength(6), this.noText]],
      postal: ['', [Validators.maxLength(20), Validators.required]]
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.wrap?.nativeElement.clientWidth | 1;

    if (window.innerWidth <= 1165) {
      this.scale = window.innerWidth / this.width - 0.1;

      if (window.innerWidth <= 769) {
        this.scale = 0.9
        this.scale = window.innerWidth / 769 - 0.1;
      }

      if (window.innerWidth <= 426) {
        this.scale = 0.9;
        this.scale = window.innerWidth / 426 - 0.2;
      }

      if (window.innerWidth <= 375) {
        this.scale = 0.7
      }
    }
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.changeJson();
    this.frames.cityPlaceholder()
    this.onResize();
  }

  private changeJson(): void {
    this._translate.get(['Order.userData', 'Order.informImg']).pipe(takeUntil(this._subscribe$)).subscribe((res: any) => {
      this._frstName = res["Order.userData"].frstName;
      this._email = res["Order.userData"].email;
      this._phoneNumber = res["Order.userData"].phoneNumber;
      this._country = res["Order.userData"].country;
      this._addres = res["Order.userData"].addres;
      this._sale = res["Order.userData"].sale;
      this._shipping = res["Order.userData"].shipping;
      this.__addresPost = res["Order.userData"].addresPost;
      this._comment = res["Order.userData"].comment;
      this._btnOrder = res["Order.userData"].btnOrder;
      this.title = res["Order.informImg"].title;
      this._imgLength = res["Order.informImg"].imgLength;
      this._letterSum = res["Order.informImg"].letterSum;
      this._price = res["Order.informImg"].price;
      this._addSum = res["Order.informImg"].addSum;
      this._carzin = res["Order.informImg"].carzin;
      this.titleH1 = res["Order.informImg"].titleH1;
      this.titleH2 = res["Order.informImg"].titleH2;
      this.ship = res["Order.userData"].ship;
      this.sahleLengt = res["Order.userData"].saleLength;
    })

  }

  public setStyle(num: number): object {
    let style = {
      transform: "translate(-50%, " + num + "% )" + "scale(" + this.scale + ")"
    }
    return style
  }

  public erroreName(formName: string): string {
    this._translate.get('ErroreMessage').pipe(takeUntil(this._subscribe$)).subscribe((res: any) => {

      if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = res.required;
      if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `${res.minlength} 3 `;
      if (this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = res.userNameChar;
      if (this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr = res.isEmail;
      if (this.validateForm.get(formName)?.hasError('isSize')) this.erroreStr = res.isSize;
      if (this.validateForm.get(formName)?.hasError('noText')) this.erroreStr = res.textErr;
      if (this.validateForm.get(formName)?.hasError('maxlength')) this.erroreStr = res.titleLength;
    })

    return this.erroreStr;
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
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // sharunakeli   created_frame
    const ids: any[] = [];
    this.frames.orderList.forEach((obj: any) => {
      ids.push(obj.created_frame)
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
      const modalRef = this.modalService.open(OkoderComponent);
      modalRef.componentInstance.validateForm = this.validateForm;
      modalRef.componentInstance.count = this.count;
      modalRef.componentInstance.order = order;
    }

  }

  public salePost(event:any ): void {

    this.validateForm.get('sale')?.setValue(event.target.value)
    const sale = {
      price: this.frames.sum,
      code: this.validateForm.get('sale')?.value
    }

    if (this.validateForm.get('sale')?.value.length === 6 && this.promoId === null && this.validateForm.get('sale')?.valid) {
      this.frames.promoCodePost(sale).pipe(takeUntil(this._subscribe$)).subscribe((promoCode: PromoCodeResults) => {
        this.frames.sum = promoCode.discounted_price;
        this.promoId = promoCode.promo_code.id;
        this.promoError = '';
      },
        (error: HttpErrorResponse) => {
          this.promoError = error.error.message;
        })
    }
  }

  public deleteDate(obj:CardItemResults): void {
    this.frames.deleteOrder(obj.id).pipe(takeUntil(this._subscribe$)).subscribe(() => {
      this.frames.sum -= obj.created_frame_details.price;
      this.frames.orderList = this.frames.orderList.filter((val: CardItemResults) => {
        return val.id != obj.id
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



