import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { OkRegisterComponent } from '../ok-register/ok-register.component';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { RegisterResult } from 'src/app/interface/register-response';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RegisterService } from './register.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public currentDate = new Date();
  public validateForm: FormGroup = new FormGroup({});
  public _subscribe$ = new Subject();
  private checkPass = this.validateForm.get('pasRev');
  public emailMassage: string = '';
  public matcher = new MyErrorStateMatcher();

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public i18n: NzI18nService, public _translate: TranslateService,
    public registerService: RegisterService, public frames: FramesServService, private spinner: NgxSpinnerService, public modalService: NgbModal, public valid: ValidationServService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide()
    this.frames.cityPlaceholder();
    this.frames.userCountry();

    this.validateForm = this.fb.group({
      frstName: [null, [Validators.minLength(3), Validators.required, Validators.maxLength(50), this.valid.userNameChar]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), this.valid.userNameChar]],
      phoneNumber: [null, [Validators.required, this.valid.PhoneNumberLength]],
      pas: [null, [Validators.required, Validators.minLength(6)]],
      pasRev: [null, [Validators.required, Validators.minLength(6), this.passwordReview.bind(this)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      country: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });

    this.validateForm.get('date')?.disable()
  }

  private passwordReview(control: FormControl): object | null {
    if (control.value && (control.value !== this.validateForm.get('pas')?.value)) {
      return {
        passwordReview: true
      }
    }
    return null
  }


  private birt(formName: string): string {
    const date = new Date(this.validateForm.get(formName)?.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()
    const date_of_birth = year + '-' + month + '-' + day;
    return date_of_birth;
  }


  public submitForm(): void {
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
      image: '',
      is_creator:false
    }

    if (this.validateForm.valid) {
      this.registerService.userRegisterPost(userDetalis).pipe(takeUntil(this._subscribe$)).subscribe((register: RegisterResult) => {
        this.registerService.isRegister = true;
        this.frames.userData = register.user_details;
        const modalRef = this.modalService.open(OkRegisterComponent);
        modalRef.result.then((result) => {
          this.registerService.isRegister = false;
        }, (reason) => {
          this.registerService.isRegister = false;
        });

        this.validateForm.reset();
        this.frames.userReg = false;
        this.frames.token = 'Token ' + register.token;
        localStorage.setItem('loginAutorization', this.frames.token);
        localStorage.setItem('user-date', JSON.stringify(this.frames.userData))
        setTimeout(() => {
          modalRef.dismiss();
        },500)

      }, ((err: any) => {
        if (err.status === 400) {
          this._translate.get('ErroreMessage').pipe(takeUntil(this._subscribe$))
            .subscribe((res: any) => {
              this.emailMassage = res.emailMassage
            })
        }

      }))
    }

  }

  ngDoCheck(): void {
    if (this.registerService.isRegister) {
      this.activeModal.dismiss()
    }
  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
