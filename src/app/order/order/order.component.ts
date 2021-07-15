import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { getISOWeek } from 'date-fns';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({});
  erroreStr: string = '';
  heigth: number | undefined;
  width: number | undefined;
  selectedValue: any[] = [];
  promoError: string = '';
  shiping: any[] = [];
  scale: number = 1;
  promoId = null;
  sum: number = 0;
  @ViewChild("wrap", { static: false }) wrap: ElementRef | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.heigth = this.wrap?.nativeElement.clientHeight | 1;
    this.width = this.wrap?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.scale = window.innerWidth / this.width - 0.1;
    }

    if (this.frames.letterImges.length <= 4 && this.frames.letterImges.length) {
      if (window.innerWidth <= 1165) {
        this.width += 280;
        this.scale = window.innerWidth / this.width - 0.2;
      }
    }

    if (this.frames.letterImges.length <= 2 && this.frames.letterImges.length) {
      if (window.innerWidth <= 1165) {
        this.width += 380;
        this.scale = window.innerWidth / this.width;
      }
    }
  }
  constructor(public frames: FramesServService, private fb: FormBuilder, private i18n: NzI18nService) { }

  ngOnInit(): void {
    // this.frames.isImg = true;
    this.frames.shipingMethod().subscribe((el: any) => {
      this.shiping = el.results;
    })

    this.frames.orderList.forEach((obj: any) => {
      this.sum += obj.created_frame_details.price;
    })

    this.userCountry();
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.required, Validators.minLength(3), this.userNameChar]],
      email: [null, [Validators.required, this.emailValid]],
      phoneNumber: [null, [Validators.required, this.PhoneNumberLength]],
      country: [null, [Validators.required]],
      addres: [null, [Validators.required]],
      shipping: [null, [Validators.required]],
      comment: ['', []],
      sale: ['', []],
     // date:[null,[]]
      // remember: [true]
    });
  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.scale + ")"
    }
    return style
  }

  erroreName(formName: string) {
    if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = 'լռացրեք  տվյալ դաշտը';
    if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = 'տառերի քանակը պետք է լինի 3-ից ավել';
    if (this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = 'թիվ չպետք է լինի';
    if (this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr = 'Email-ը վալիդ չէ';
    if (this.validateForm.get(formName)?.hasError('isSize')) this.erroreStr = 'հեռախոսահամարը սխալ է';
    return this.erroreStr;
  }

  userNameChar(control: FormControl) {
    const regExp = /[0-9]/;
    if (regExp.test(control.value)) {
      return {
        userNameChar: true
      }
    }
    return false
  }

  emailValid(control: FormControl) {
    const regExp = /^([a-z0-9._%+-])+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!regExp.test(control.value)) {
      return {
        isEmail: true
      }
    }
    return false
  }

  PhoneNumberLength(control: FormControl) {
    const size = 9;
    if (control.value && control.value.length < 9) {
      return {
        isSize: true
      }
    }
    return false
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const ids: any[] = [];
    this.frames.orderList.forEach((obj: any) => {
      ids.push(obj.id)
    })

    const order = {
      full_name: this.validateForm.get('frstName')?.value,
      shipping_method: this.validateForm.get('shipping')?.value,
      phone_number: this.validateForm.get('phoneNumber')?.value,
      email: this.validateForm.get('email')?.value,
      city: this.validateForm.get('country')?.value,
      address: this.validateForm.get('addres')?.value,
      price: this.sum,
      comment: this.validateForm.get('comment')?.value,
      promo_code: this.promoId,
      order_items: ids
    }
    if (this.validateForm.valid) {
      this.frames.userOrder(order).subscribe((el:any)=>{
          // sharunakeli
        console.log('el',el)
      })
    }
  
  }

  salePost(event: any) {
    this.validateForm.get('sale')?.setValue(event.target.value)
    const sale = {
      price: this.sum,
      code: this.validateForm.get('sale')?.value
    }
    // promo 147852

    if (this.validateForm.get('sale')?.value.length === 6 &&   this.promoId === null) {
      this.frames.promoCodePost(sale).subscribe((el: any) => {
        this.sum = el.discounted_price;
        console.log('el',el);
        this.promoId = el.promo_code.id;
        this.promoError = '';
      },
        (error: any) => {
          this.promoError = error.error.message;
        })
    }
  }

  userCountry() {
    this.frames.getCountry()
      .subscribe((el: any) => {
        this.selectedValue = el.results
      })
  }


  deleteDate(obj: any) {
    this.frames.deleteOrder(obj.id).subscribe((el: any) => {
      this.sum -= obj.created_frame_details.price;
      this.frames.orderList = this.frames.orderList.filter((val: any) => {
        return val.id != obj.id
      })

      if (this.frames.orderList.length === 0) {
        this.frames.showFrame()
      }
    });

  }

  // oracujc
  // date = null;
  // isEnglish = false;

  // onChange(result: Date): void {
  //   //  console.log('onChange: ', result);
  // }

  // getWeek(result: Date): void {
  //   // console.log('week: ', getISOWeek(result));
  // }

  // changeLanguage(): void {
  //   this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
  //   this.isEnglish = !this.isEnglish;
  // }
}



