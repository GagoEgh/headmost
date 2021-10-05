import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OkoderComponent } from '../okoder/okoder.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewChecked {
  validateForm: FormGroup = new FormGroup({});
  public _subscribe$ = new Subject();
  erroreStr: string = '';
  heigth: number | undefined;
  width: number | undefined;
  promoError: string = '';
  shiping: any[] = [];
  _frstName = '';
  _brtDay = '';
  _email = '';
  _phoneNumber = '';
  _country = '';
  _addres = '';
  _sale = '';
  _shipping = '';
  __addresPost = '';
  _comment = '';
  _btnOrder = ''
  titleH1 = '';
  titleH2 = '';
  title = '';
  _imgLength = '';
  _letterSum = '';
  _price = '';
  _addSum = '';
  _carzin = '';
  scale: number = 1;
  promoId = null;
  sumInit = 0;
  count = 0;

  @ViewChild("wrap", { static: false }) wrap: ElementRef | undefined;

  constructor(public frames: FramesServService, private fb: FormBuilder, public modalService: NgbModal,
    public _translate: TranslateService, public valid: ValidationServService) {

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

  ngOnInit(): void {
    this.frames.cityPlaceholder()
    this.changeJson()
    this.frames.isdisible = false;
    setTimeout(() => {
      this.frames.isMyOrder = false;
    })


    this.frames.shipingMethod().pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.shiping = el.results;

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
      sale: ['', [this.noText]],
      postal: ['', [Validators.maxLength(20),Validators.required]]
    });

  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.changeJson();
    this.frames.cityPlaceholder()
    this.onResize();

  }

  // cityPlaceholder(){
  //   this._translate.get('_order._user-data.country_placeholder').pipe(takeUntil(this._subscribe$)).subscribe((el) => {
  //     this.country_placeholder = el;
  //   })
  // }

  changeJson() {
    this._translate.get(['_order._user-data', '_order._inform-img']).pipe(takeUntil(this._subscribe$)).subscribe((res: any) => {
      this._frstName = res["_order._user-data"]._frstName;
      this._email = res["_order._user-data"]._email;
      this._phoneNumber = res["_order._user-data"]._phoneNumber;
      this._country = res["_order._user-data"]._country;
      this._addres = res["_order._user-data"]._addres;
      this._sale = res["_order._user-data"].sale;
      this._shipping = res["_order._user-data"]._shipping;
      this.__addresPost = res["_order._user-data"]._addresPost;
      this._comment = res["_order._user-data"]._comment;
      this._btnOrder = res["_order._user-data"]._btnOrder;
      this.title = res["_order._inform-img"].title;
      this._imgLength = res["_order._inform-img"]._imgLength;
      this._letterSum = res["_order._inform-img"]._letterSum;
      this._price = res["_order._inform-img"]._price;
      this._addSum = res["_order._inform-img"]._addSum;
      this._carzin = res["_order._inform-img"]._carzin;
      this.titleH1 = res["_order._inform-img"].title_h1;
      this.titleH2 = res["_order._inform-img"].title_h2;
    })
  }

  public setStyle(num: number) {
    let style = {
      transform: "translate(-50%, " + num + "% )" + "scale(" + this.scale + ")"
    }
    return style
  }

  erroreName(formName: string) {
    this._translate.get('_erroreMessage').pipe(takeUntil(this._subscribe$)).subscribe((res: any) => {

      if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = res._required;
      if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `${res._minlength} 3 `;
      if (this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = res._userNameChar;
      if (this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr = res._isEmail;
      if (this.validateForm.get(formName)?.hasError('isSize')) this.erroreStr = res._isSize;
      if (this.validateForm.get(formName)?.hasError('noText')) this.erroreStr = res.textErr;
      if (this.validateForm.get(formName)?.hasError('maxlength')) this.erroreStr = res.titleLength;
    })

    return this.erroreStr;
  }

  noText(control:FormControl){
    const regExp = /[a-zA-Z]/;
    if(regExp.test(control.value)){
      return{
        noText:true
      }
    }
     return null
  }

  submitForm(): void {
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

  salePost(event: any) {

    this.validateForm.get('sale')?.setValue(event.target.value)
    const sale = {
      price: this.frames.sum,
      code: this.validateForm.get('sale')?.value
    }

    if (this.validateForm.get('sale')?.value.length === 6 && this.promoId === null && this.validateForm.get('sale')?.valid ) {
      this.frames.promoCodePost(sale).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
        this.frames.sum = el.discounted_price;
        this.promoId = el.promo_code.id;
        this.promoError = '';
      },
        (error: any) => {
          this.promoError = error.error.message;
        })
    }
  }


  deleteDate(obj: any) {
    this.frames.deleteOrder(obj.id).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.frames.sum -= obj.created_frame_details.price;
      this.frames.orderList = this.frames.orderList.filter((val: any) => {
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



