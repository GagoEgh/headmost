import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal,  NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({}) ;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
     
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  // updateConfirmValidator(): void {
  //   /** wait for refresh value */
  //  // Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  // }


  open() {
    const modalRef = this.modalService.open(RegisterComponent);
  }

}
