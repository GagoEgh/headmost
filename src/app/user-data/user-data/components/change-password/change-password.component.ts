import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MyErrorStateMatcher } from '../../user-data.component';
import { faEye, faComment, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public newPassword!: FormGroup;
  faEye:any = faEye;
  constructor(
    private fb:FormBuilder,
    public activeModal: NgbActiveModal
  ) {  this.passwordFormInit() }

  ngOnInit(): void {
   
  }

  passwordFormInit() {
    this.newPassword = this.fb.group({
      newPass: [null, [Validators.required, Validators.maxLength]],
      reapetPass: [null, [Validators.required, Validators.minLength]]
    })
  }

  changePassword(){
    console.log(this.newPassword.controls['newPass'].hasError('minlength'))
    
    this.activeModal.close('Close click')
  }
}
