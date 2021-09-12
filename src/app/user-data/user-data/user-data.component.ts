import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';





@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit, AfterViewChecked {
  validateForm: FormGroup = new FormGroup({});
  public _unsubscribe$ = new Subject();
  erroreStr: string = '';
  emailMassage = '';
  updateOk = '';
  constructor(private valid: ValidationServService, private fb: FormBuilder, public _translate: TranslateService, public frames: FramesServService) { }
  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang)
  }

  ngOnInit(): void {

    this.frames.isMyOrder = false;
    this.frames.userCountry();
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      last: [null, [Validators.required, Validators.minLength(3), this.valid.userNameChar]],
      addres: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, this.valid.PhoneNumberLength]],
      email: [null, [Validators.required, this.valid.emailValid]],
      country: [null, [Validators.required]],
      date: [this.frames.userData.date_of_birth, [Validators.required]],
    });
  }

  erroreName(formName: string) {
    this._translate.get('_erroreMessage').pipe(takeUntil(this._unsubscribe$)).subscribe((res: any) => {
      let size = 3;
      if (formName === 'pas') size = 6
      if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = res._required;
      if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `${res._minlength} ${size} `;
      if (this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = res._userNameChar;
      if (this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr = res._isEmail;
      if (this.validateForm.get(formName)?.hasError('isSize')) this.erroreStr = res._isSize;
    })
    return this.erroreStr;
  }

  birt(formName: string) {
    const date = new Date(this.validateForm.get(formName)?.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()
    const date_of_birth = year + '-' + month + '-' + day;
    return date_of_birth;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const date = this.birt('date');
    const edit = {
      date_of_birth: date,
      city: this.validateForm.get('country')?.value,
      address: this.validateForm.get('addres')?.value.trim(),
      image: '',
      comment: '',
      last_name: this.validateForm.get('last')?.value,
      first_name: this.validateForm.get('frstName')?.value

    }

    if (this.validateForm.valid) {
      this.frames.editUser(edit).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
        this.updateOk = 'Փոփոխությունները հաջողությամբ կատարվել են';
        localStorage.setItem('user-date', JSON.stringify(this.frames.userData))
      })
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}



