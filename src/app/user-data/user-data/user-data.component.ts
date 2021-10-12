import { ValidationServService } from 'src/app/shared/validation-serv.service';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataCheckComponent } from '../data-check/data-check.component';
import { NoCheckComponent } from '../no-check/no-check.component';


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
  userName = '';
  isChange = false;
  constructor(private valid: ValidationServService, private fb: FormBuilder, public modalService: NgbModal,
    public _translate: TranslateService, public frames: FramesServService) { }




  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.frames.cityPlaceholder();
  }

  ngOnInit(): void {

    this.frames.isMyOrder = false;
    this.frames.userCountry();
    this.userName = this.frames.userData.user_details.first_name;
    this.changeDate();
    this.validateForm = this.fb.group({
      frstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), this.valid.userNameChar]],
      last: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), this.valid.userNameChar]],
      addres: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, this.valid.PhoneNumberLength]],
      email: [null, [Validators.required, this.valid.emailValid]],
      country: [null, [Validators.required]],
      date: [this.frames.userData.date_of_birth, [Validators.required, this.valid.bigDate]],
      pas: [null, [Validators.required, Validators.minLength(6)]],
    });

  }

  erroreName(formName: string) {
    this._translate.get('_erroreMessage').pipe(takeUntil(this._unsubscribe$)).subscribe((res: any) => {
      let size = 3;
      if (formName === 'pas') size = 6
      if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = res._required;
      if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `${res._minlength} ${size} `;
      if (this.validateForm.get(formName)?.hasError('maxlength')) this.erroreStr = `${res.maxLength}`;
      if (this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = res._userNameChar;
      if (this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr = res._isEmail;
      if (this.validateForm.get(formName)?.hasError('isSize')) this.erroreStr = res._isSize;
      if (this.validateForm.get(formName)?.hasError('bigDate')) this.erroreStr = res._bigDate
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

  changeDate() {
    let data: any = localStorage.getItem('user-date');
    let user_data = JSON.parse(data);

    if (user_data.user_details.first_name !== this.validateForm.get('frstName')?.value ||
      user_data.user_details.last_name !== this.validateForm.get('last')?.value ||
      user_data.phone_number !== this.validateForm.get('phoneNumber')?.value ||
      user_data.city !== this.validateForm.get('country')?.value
    ) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }

  }


  submitForm(): void {
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    //   console.log(this.validateForm.controls[i].value);
    // }



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

    this.changeDate()

    if (this.validateForm.valid && this.isChange) {
      this.userName = edit.first_name;
      this.frames.editUser(edit).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
        this.frames.userData = el;
        this.frames.userData.user_details.first_name = this.userName;
        let myJson = JSON.stringify(this.frames.userData);
        localStorage.setItem('user-date', myJson);
        const modalRef = this.modalService.open(DataCheckComponent);
        setTimeout(() => {
          modalRef.dismiss()
        }, 2000)
      })
    }

    if (!this.isChange) {
      const modal = this.modalService.open(NoCheckComponent);
      setTimeout(() => {
        modal.dismiss()
      }, 2000)
    }

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}



