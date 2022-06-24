import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { RegisterResult } from 'src/app/modeles/register-response.modele';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginDto } from 'src/app/modeles/loginDto';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {
  public validateForm: FormGroup = new FormGroup({});
  public matcher = new MyErrorStateMatcher();
  public _subscribe$ = new Subject();
  public errorLog: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public _translate: TranslateService,
    public loginService: LoginService,
    private fb: FormBuilder,
    public frames: FramesServService,
    private valid: ValidationServService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public ngDoCheck(): void {
    if (this.loginService.isLogin) {
      this.activeModal.dismiss()
    }
  }

  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    const userLog =new LoginDto(this.validateForm.value);
    if (this.validateForm.valid) {
      this.loginService.userLogin(userLog)
        .pipe(
          takeUntil(this._subscribe$),
          switchMap((register: RegisterResult) => {
            this.spinner.show();
            this.frames.token = 'Token ' + register.token;
            this.frames.userData = register.user_details;
            localStorage.setItem('loginAutorization', this.frames.token);
            localStorage.setItem('user-date', JSON.stringify(this.frames.userData));
            this.activeModal.dismiss();
            this.validateForm.reset();
            this.frames.userReg = false;
            return this.frames.getUserOrder(this.frames.userData.user)
          }),
          catchError((err: HttpErrorResponse) => {
            this.errorLog = true
            return throwError(() => err)

          })).subscribe(
            {
              next: (res: any) => {
                this.frames.orderList = res.results;
                this.frames.isGet = true;
                this.frames.userInfo()
                  .pipe(takeUntil(this._subscribe$))
                  .subscribe({
                    next: (serverResponce: ServerResponce<[]>) => {
                      this.frames.orderList.forEach((obj: any) => {
                        this.frames.sum += obj.created_frame_details.price;
                      })

                    },

                  })
                this.spinner.hide()
              }
            }
          )
    }
  }

  public open(): void {
    const modalRef = this.modalService.open(RegisterComponent, { size: 'lg' })
    modalRef.result.then((result) => {
      this.loginService.isLogin = false;
    }, (reason) => {
      this.loginService.isLogin = false;
    });
    this.loginService.isLogin = true;
  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
