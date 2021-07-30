import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { ValidationServService } from 'src/app/shared/validation-serv.service';


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
  promoError: string = '';
  shiping: any[] = [];
  scale: number = 1;

  promoId = null;
  sumInit = 0;

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

  constructor(public frames: FramesServService, private fb: FormBuilder, private i18n: NzI18nService, public valid: ValidationServService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.frames.isMyOrder = false;
    })


    this.frames.shipingMethod().subscribe((el: any) => {
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
      comment: ['', []],
      sale: ['', []],
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
      order_items: ids
    }

    

    if (this.validateForm.valid &&this.count != 1 ) {
      this.frames.isOrder = true
        this.frames.userOrder(order).subscribe((el: any) => {
         this. count++;
           this.frames.isOrder =false;
          window.open('https://www.youtube.com/','_self');
   
        })
      
    }
    console.log('count durs',this.count)
  }
  count = 0;
  salePost(event: any) {
    this.validateForm.get('sale')?.setValue(event.target.value)
    const sale = {
      price: this.frames.sum,
      code: this.validateForm.get('sale')?.value
    }

    if (this.validateForm.get('sale')?.value.length === 6 && this.promoId === null) {
      this.frames.promoCodePost(sale).subscribe((el: any) => {
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
    this.frames.deleteOrder(obj.id).subscribe((el: any) => {
      this.frames.sum -= obj.created_frame_details.price;
      this.frames.orderList = this.frames.orderList.filter((val: any) => {
        return val.id != obj.id
      })


      if (this.frames.orderList.length === 0) {
        this.frames.showFrame()
      }

    });

  }

}



