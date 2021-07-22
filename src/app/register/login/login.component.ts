import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {
  validateForm: FormGroup = new FormGroup({});
  errorLog = '';
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,
    private fb: FormBuilder, public frames: FramesServService, private valid: ValidationServService) { }

  ngDoCheck(): void {
    if (this.frames.isLogin) {
      this.activeModal.dismiss()
    }
  }


  ngOnInit(): void {

    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required, this.valid.emailValid]],
      password: [null, [Validators.required, Validators.minLength(6)]],

    });
  }

  submitForm(): void {
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
      this.frames.userLogin(userLog).subscribe((el: any) => {
        this.frames.token = 'Token ' + el.token;
        this.frames.userData = el.user_details;
        localStorage.setItem('loginAutorization', this.frames.token);
        localStorage.setItem('user-date', JSON.stringify(this.frames.userData));
        this.activeModal.dismiss();
        this.validateForm.reset();
        this.frames.userReg = false;

        this.frames.userInfo().subscribe((el: any) => {
          this.frames.orderList = el.results;

          this.frames.orderList.forEach((obj: any) => {
            this.frames.sum += obj.created_frame_details.price

          })
          console.log('login', this.frames.sum);

        })

      }, ((err: any) => {
        this.errorLog = err.error.message
      }))
    }

  }

  open() {
    const modalRef = this.modalService.open(RegisterComponent, { size: 'lg' })
    modalRef.result.then((result) => {
      this.frames.isLogin = false;
    }, (reason) => {
      this.frames.isLogin = false;
    });
    this.frames.isLogin = true;

  }


}
