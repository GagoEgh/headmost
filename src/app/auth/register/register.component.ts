import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { OkRegisterComponent } from '../ok-register/ok-register.component';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { RegisterResult } from 'src/app/modeles/register-response.modele';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RegisterService } from './register.service';
import { RegisterDto } from 'src/app/modeles/RegisterDto';
import { ConfirmedValidator } from 'src/app/RepeadPassword';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public _subscribe$ = new Subject();
  public currentDate = new Date();
  public validateForm!: FormGroup;
  public emailMassage!: string;
  

  constructor(
    private registerService: RegisterService,
    private valid: ValidationServService,
    private _translate: TranslateService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public frames: FramesServService,
    ) { }


  ngOnInit(): void {
    this.getCountryAndCity();
    this.formInint();
    this.validateForm.get('date')?.disable()
  }

  private getCountryAndCity() {
    forkJoin({
      city: this.frames.cityPlaceholder(),
      country: this.frames.userCountry()
    })
    .pipe(takeUntil(this._subscribe$))
    .subscribe({
      next: (res) => {
        this.frames.selectedValue = res.country.results;
        this.frames.country_placeholder = res.city
      }
    })
  }
  
  private formInint() {
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.minLength(3), Validators.required,
      Validators.maxLength(50), this.valid.userNameChar]],
      lastName: [null, [Validators.required, Validators.minLength(3),
      Validators.maxLength(50), this.valid.userNameChar]],
      phoneNumber: [null, [Validators.required, this.valid.PhoneNumberLength]],
      pas: [null, [Validators.required, Validators.minLength(6)]],
      pasRev: [null, [Validators.required, Validators.minLength(6),
    ]],
      email: [null, [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      country: [null, [Validators.required]],
      date: [null, [Validators.required]],
    },{
      validator: ConfirmedValidator('pas', 'pasRev')
    });
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

    const userDetalis = new RegisterDto(this.validateForm.value, this.birt('date'))

    if (this.validateForm.valid) {
      this.registerService.userRegisterPost(userDetalis)
        .pipe(takeUntil(this._subscribe$))
        .subscribe((register: RegisterResult) => {
          this.registerService.isRegister = true;
          this.frames.userData = register.user_details;
          const modalRef = this.modalService.open(OkRegisterComponent);
          modalRef.result.then(() => {
            this.registerService.isRegister = false;
          }, () => {
            this.registerService.isRegister = false;
          });

          this.validateForm.reset();
          this.frames.userReg = false;
          this.frames.token = 'Token ' + register.token;
          localStorage.setItem('loginAutorization', this.frames.token);
          localStorage.setItem('user-date', JSON.stringify(this.frames.userData))
          setTimeout(() => {
            modalRef.dismiss();
          }, 1000)

        }, ((err: any) => {
          if (err.status === 400) {
            this._translate.get('ErroreMessage')
              .pipe(takeUntil(this._subscribe$))
              .subscribe((res: any) => {
                this.emailMassage = res.emailMassage;
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
