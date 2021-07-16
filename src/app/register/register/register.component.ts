import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import {  NzI18nService} from 'ng-zorro-antd/i18n';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  erroreStr: string = '';
  validateForm: FormGroup = new FormGroup({});
  selectedValue: any[] = [];
  shiping: any[] = [];
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private i18n: NzI18nService,
    public frames:FramesServService) {}

  ngOnInit(): void {
   
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.required, Validators.minLength(3), this.userNameChar]],
      lastName: [null, [Validators.required, Validators.minLength(3), this.userNameChar]],
      email: [null, [Validators.required, this.emailValid]],
      phoneNumber: [null, [Validators.required, this.PhoneNumberLength]],
      city: [null, [Validators.required, this.userNameChar,Validators.minLength(3)]],
      date:[null,[Validators.required]]
    });

  
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
    this.frames.isRegister = false;
    console.log('this.validateForm',this.validateForm);
  }
  
  
}
