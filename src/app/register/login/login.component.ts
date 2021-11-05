import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RegisterResult } from 'src/app/interface/register-response';
import { ServerResponce } from 'src/app/interface/img-ramka';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {
  validateForm: FormGroup = new FormGroup({});
  public _subscribe$ = new Subject();
  public erroreStr: string = '';
  public errorLog: string = '';

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, public _translate: TranslateService,
    private fb: FormBuilder, public frames: FramesServService, private valid: ValidationServService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],

    });
  }

  public ngDoCheck(): void {
    if (this.frames.isLogin) {
      this.activeModal.dismiss()
    }
  }

  public erroreName(formName: string): string {
    this._translate.get('ErroreMessage').pipe(takeUntil(this._subscribe$)).subscribe((res: any) => {
      if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = res.required;
      if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `${res.minlength} 6`;
      if (this.validateForm.get(formName)?.hasError('email')) this.erroreStr = res.isEmail;
    })
    return this.erroreStr;
  }

  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    const userLog = {
      username: this.validateForm.get('email')?.value,
      password: this.validateForm.get('password')?.value
    }
    if (this.validateForm.valid) {

      this.frames.userLogin(userLog).pipe(takeUntil(this._subscribe$)).subscribe((register:RegisterResult) => {
        this.spinner.show();
        this.frames.token = 'Token ' + register.token;
        this.frames.userData = register.user_details;
        localStorage.setItem('loginAutorization', this.frames.token);
        localStorage.setItem('user-date', JSON.stringify(this.frames.userData));
        this.activeModal.dismiss();
        this.validateForm.reset();
        this.frames.userReg = false;
        
        this.frames.userInfo().pipe(takeUntil(this._subscribe$)).subscribe((serverResponce:ServerResponce<[]>) => {
          this.frames.orderList = serverResponce.results;
          this.frames.orderList.forEach((obj: any) => {
            this.frames.sum += obj.created_frame_details.price;
          })
        })
        setTimeout(() => {
          this.spinner.hide()
        }, 200)


      }, ((err: any) => {
        this.errorLog = err.error.message
      }))
    }
  }

  public open(): void {
    const modalRef = this.modalService.open(RegisterComponent, { size: 'lg' })
    modalRef.result.then((result) => {
      this.frames.isLogin = false;
    }, (reason) => {
      this.frames.isLogin = false;
    });
    this.frames.isLogin = true;
  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
