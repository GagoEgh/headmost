import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangePasswordDto } from 'src/app/modeles/changePasswordDto';
import { ConfirmedValidator } from 'src/app/RepeadPassword';
import { UserDataService } from '../../user-data.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public newPassword!: FormGroup;
  public responseErrore = '';



  private unsubscribe$ = new Subject();


  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private userDataService: UserDataService
  ) { }





  ngOnInit(): void {
    this.passwordFormInit();

  }


  passwordFormInit() {
    this.newPassword = this.fb.group({
      oldPass: [null, [Validators.required, Validators.minLength(6)]],
      newPass: [null, [Validators.required, Validators.minLength(6)]],
      repeat_password: [null, [Validators.required, Validators.minLength(6)
      ]]
    }, {
      validator: ConfirmedValidator('newPass', 'repeat_password')
    })
  }


  changePassword() {

    if (this.newPassword.valid) {

      const changePasswordDto = new ChangePasswordDto(this.newPassword.value);
      this.userDataService.changePasword(changePasswordDto)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.activeModal.close();
          },
          error: (error: any) => {
            this.responseErrore = error.error.message;
          }
        })
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
