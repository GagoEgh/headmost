import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FramesServService } from 'src/app/frames-serv.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({});
  erroreStr: string = '';
  constructor(public frames: FramesServService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.frames.isImg = true;
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(3),this.userNameChar]],
      email: [null, [Validators.required, this.emailValid]],
      phoneNumber: [null, [Validators.required]],
      remember: [true]
    });

  }

  erroreName(formName: string) {
    if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = 'լռացրեք  տվյալ դաշտը';
    if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = 'տառերի քանակը պետք է լինի 3-ից ավել';
    if(this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = 'թիվ չպետք է լինի';
    if(this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr ='Email-ը վալիդ չէ'
    return this.erroreStr;
  }

  userNameChar(control: FormControl) {
    const regExp = /[0-9]/;
    if (regExp.test(control.value)) {
      return {
        userNameChar:true
      }
    }
    return false
  }
 
  emailValid(control:FormControl){
    const regExp = /^([a-z0-9._%+-])+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(!regExp.test(control.value)){
      return {
        isEmail:true
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

}
