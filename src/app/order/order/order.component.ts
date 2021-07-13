import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FramesServService } from 'src/app/shared/frames-serv.service';


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
  scale: number = 1;
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
  constructor(public frames: FramesServService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.frames.isImg = true;
    this.frames.orderList.forEach((obj: any) => {
      this.sum += obj.created_frame_details.price;
    })

    this.userCountry();
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(3), this.userNameChar]],
      email: [null, [Validators.required, this.emailValid]],
      phoneNumber: [null, [Validators.required, this.PhoneNumberLength]],
      country: [null, [Validators.required]],
      addres: [null, [Validators.required]],
      comment: [null, []],
      sale: ['', []]
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
  }

  salePost() {
    const sale = {
      // "code":147852,
      // "price":1000
      price: this.sum,
      code: this.validateForm.get('sale')?.value
    }

    if (this.validateForm.get('sale')?.touched && this.validateForm.get('sale')?.pristine) {
      this.frames.promoCodePost(sale).subscribe((el: any) => {
        console.log(el)
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

}



