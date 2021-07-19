import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { OkRegisterComponent } from '../ok-register/ok-register.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({});
  selectedValue: any[] = [];
  erroreStr: string = '';
  shiping: any[] = [];
  emailMassage = '';
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private i18n: NzI18nService,
    public frames: FramesServService, private modalService: NgbModal, private valid: ValidationServService) { }

  ngOnInit(): void {
    this.frames.userCountry();
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      lastName: [null, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      phoneNumber: [null, [Validators.required, this.valid.PhoneNumberLength]],
      pas: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, this.valid.emailValid]],
      country: [null, [Validators.required]],
      date: [null, [Validators.required]],

    });
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
    let size = 3;
    if (formName === 'pas') size = 6
    if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = 'լռացրեք  տվյալ դաշտը';
    if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `տառերի քանակը պետք է լինի ${size}-ից ավել`
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

    const date = new Date(this.validateForm.get('date')?.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()

    const userDetalis = {
      phone_number: this.validateForm.get('phoneNumber')?.value,
      first_name: this.validateForm.get('frstName')?.value,
      last_name: this.validateForm.get('lastName')?.value,
      date_of_birth: year + '-' + month + '-' + day,
      city: this.validateForm.get('country')?.value,
      password: this.validateForm.get('pas')?.value,
      email: this.validateForm.get('email')?.value,
      comment: '',
      image: ''
    }

    if (this.validateForm.valid) {
      this.frames.userRegisterPost(userDetalis).subscribe((el: any) => {

        this.frames.isRegister = true;
        this.frames.userData = el.user_details;
        const modalRef = this.modalService.open(OkRegisterComponent);
        modalRef.result.then((result) => {
          this.frames.isRegister = false;
        }, (reason) => {
          this.frames.isRegister = false;
        });
        this.validateForm.reset();
        this.frames.userReg = false;
        this.frames.token += el.token;
        localStorage.setItem('registerAuthorization', this.frames.token);
      }, ((err: any) => {
        if (err.status === 400) {
          this.emailMassage = 'տվյալ email-ը զբաղված է';
        }
      }))
    }

  }

  ngDoCheck(): void {
    if (this.frames.isRegister) {
      this.activeModal.dismiss()
    }
  }
}
