import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public newPassword!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.newPassword = this.passwordFormInit()
  }


  passwordFormInit() {
    return this.fb.group({
      newPass: [null, [Validators.required, Validators.minLength(6)]],
      reapetPass: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  changePassword() {
    console.log(this.newPassword.controls)
    this.activeModal.close();
  }
}
