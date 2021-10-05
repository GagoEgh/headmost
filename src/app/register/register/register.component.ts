import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { OkRegisterComponent } from '../ok-register/ok-register.component';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewChecked {
  validateForm: FormGroup = new FormGroup({});
  public _subscribe$ = new Subject();
  checkPass = this.validateForm.get('pasRev');
  selectedValue: any[] = [];
  erroreStr: string = '';
  shiping: any[] = [];
  emailMassage = '';
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private i18n: NzI18nService, public _translate: TranslateService,
    public frames: FramesServService, private modalService: NgbModal, private valid: ValidationServService) { }
  ngAfterViewChecked(): void {
    this.styleFlex();
  }

  ngOnInit(): void {
    this.styleFlex();
    this.frames.cityPlaceholder();
    this.frames.userCountry();
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      lastName: [null, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      phoneNumber: [null, [Validators.required, this.valid.PhoneNumberLength]],
      pas: [null, [Validators.required, Validators.minLength(6)]],
      pasRev: [null, [Validators.required, Validators.minLength(6), this.passwordReview.bind(this)]],
      email: [null, [Validators.required, this.valid.emailValid]],
      country: [null, [Validators.required]],
      date: [null, [Validators.required, this.valid.bigDate]],

    });

  }

  styleFlex() {
    let flex = {
      'display': 'flex',
      'flex-wrap': 'wrap',
      'width': '800px'
    }

    if(window.innerWidth<=768){
      flex.width = 'fit-content';
      return flex
    }
    return flex
  }

  erroreName(formName: string) {
    this._translate.get('_erroreMessage').pipe(takeUntil(this._subscribe$)).subscribe((res: any) => {
      let size = 3;
      if (formName === 'pas') size = 6
      if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = res._required;
      if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `${res._minlength} ${size} `;
      if (this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = res._userNameChar;
      if (this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr = res._isEmail;
      if (this.validateForm.get(formName)?.hasError('isSize')) this.erroreStr = res._isSize;
      if (this.validateForm.get(formName)?.hasError('passwordReview')) this.erroreStr = res._checkPass;
      if (this.validateForm.get(formName)?.hasError('bigDate')) this.erroreStr = res._bigDate
    })
    return this.erroreStr;
  }

  passwordReview(control: FormControl) {

    if (control.value && (control.value !== this.validateForm.get('pas')?.value)) {
      return {
        passwordReview: true
      }

    }
    return null
  }


  birt(formName: string) {
    const date = new Date(this.validateForm.get(formName)?.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()
    const date_of_birth = year + '-' + month + '-' + day;
    return date_of_birth;
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const date = this.birt('date');
    const userDetalis = {
      phone_number: this.validateForm.get('phoneNumber')?.value,
      first_name: this.validateForm.get('frstName')?.value,
      last_name: this.validateForm.get('lastName')?.value,
      date_of_birth: date,
      city: this.validateForm.get('country')?.value,
      password: this.validateForm.get('pasRev')?.value,
      email: this.validateForm.get('email')?.value,
      comment: '',
      image: ''
    }

    if (this.validateForm.valid) {
      this.frames.userRegisterPost(userDetalis).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {

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
        this.frames.token = 'Token ' + el.token;
        localStorage.setItem('loginAutorization', this.frames.token);
        localStorage.setItem('user-date', JSON.stringify(this.frames.userData))
        //this.frames.spinner.hide();
        setTimeout(() => {
          modalRef.dismiss();
        }, 1500)

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

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
