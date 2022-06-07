import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataCheckComponent } from '../data-check/data-check.component';
import { NoCheckComponent } from '../no-check/no-check.component';
import { NgxSpinnerService } from "ngx-spinner";
import { Edit, UserDetalis } from 'src/app/modules/register-response.module';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserDataService } from './user-data.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit, AfterViewChecked {
  public validateForm: FormGroup = new FormGroup({});
  public changePassword!: FormGroup
  public matcher = new MyErrorStateMatcher();
  public _unsubscribe$ = new Subject();
  private userName = '';
  public currentDate = new Date()
  public isChange = false;
  constructor(
    private valid: ValidationServService,
    private fb: FormBuilder,
    public modalService: NgbModal,
    public userDataService: UserDataService,
    private spinner: NgxSpinnerService,
    public _translate: TranslateService,
    public frames: FramesServService) {
    this.passwordFormInit()
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.frames.cityPlaceholder();
  }

  passwordFormInit() {
    this.changePassword = this.fb.group({
      newPass: [null, [Validators.required, Validators.maxLength]],
      reapetPass: [null, [Validators.required, Validators.minLength]]
    })
  }
  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();
    this.frames.isMyOrder = false;
    this.frames.userCountry();
    this.userName = this.frames.userData.user_details.first_name;
    this.changeDate();
    this.validateForm = this.fb.group({
      frstName: [this.userName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), this.valid.userNameChar]],
      last: [this.frames.userData.user_details.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50), this.valid.userNameChar]],
      addres: [this.frames.userData.address, [Validators.required]],
      phoneNumber: [this.frames.userData.phone_number, [Validators.required, this.valid.PhoneNumberLength]],
      email: [this.frames.userData.user_details.username, [Validators.required, this.valid.emailValid]],
      country: [this.frames.userData.city, [Validators.required]],
      date: [this.frames.userData.date_of_birth, [Validators.required]],
    });
    this.validateForm.get('date')?.disable();
  }

  private birt(formName: string): string {
    const date = new Date(this.validateForm.get(formName)?.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()
    const date_of_birth = year + '-' + month + '-' + day;
    return date_of_birth;
  }

  // grel password changei logican
  passwordChange() {
    if (!this.changePassword.valid) {
      return
    }


    console.log(this.changePassword.value)
  }
  private changeDate(): void {
    let data: any = localStorage.getItem('user-date');
    let user_data = JSON.parse(data);

    if (
      user_data.user_details.first_name !== this.validateForm.get('frstName')?.value ||
      user_data.user_details.last_name !== this.validateForm.get('last')?.value ||
      user_data.phone_number !== this.validateForm.get('phoneNumber')?.value ||
      user_data.email !== this.validateForm.get('email')?.value ||
      user_data.city !== this.validateForm.get('country')?.value
    ) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }

  }


  public submitForm(): void {
    const date = this.birt('date');
    const edit: Edit = {
      date_of_birth: date,
      city: this.validateForm.get('country')?.value,
      address: this.validateForm.get('addres')?.value.trim(),
      image: '',
      comment: '',
      last_name: this.validateForm.get('last')?.value,
      first_name: this.validateForm.get('frstName')?.value
    }

    this.changeDate()
    if ( this.isChange) {
      this.userName = edit.first_name;
      this.userDataService.editUser(edit)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((userDetalis: UserDetalis) => {
          this.frames.userData = userDetalis;
          this.frames.userData.user_details.first_name = this.userName;
          let myJson = JSON.stringify(this.frames.userData);
          localStorage.setItem('user-date', myJson);
          const modalRef = this.modalService.open(DataCheckComponent);
          setTimeout(() => {
            modalRef.dismiss()
          }, 1000)
        })
    }

    if (!this.isChange) {
      const modal = this.modalService.open(NoCheckComponent);
      setTimeout(() => {
        modal.dismiss()
      }, 1000)
    }

  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}



