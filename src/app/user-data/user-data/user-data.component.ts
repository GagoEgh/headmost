import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { ValidationServService } from 'src/app/shared/validation-serv.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({});
  public _unsubscribe$ = new Subject();
  erroreStr: string = '';
  emailMassage = '';
  updateOk ='';
  constructor(private valid: ValidationServService, private fb: FormBuilder, public frames: FramesServService) { }

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
    let size = 3;
    if (formName === 'pas') size = 6
    if (this.validateForm.get(formName)?.hasError('required')) this.erroreStr = 'լռացրեք  տվյալ դաշտը';
    if (this.validateForm.get(formName)?.hasError('minlength')) this.erroreStr = `տառերի քանակը պետք է լինի ${size}-ից ավել`
    if (this.validateForm.get(formName)?.hasError('userNameChar')) this.erroreStr = 'թիվ չպետք է լինի';
    if (this.validateForm.get(formName)?.hasError('isEmail')) this.erroreStr = 'Email-ը վալիդ չէ';
    if (this.validateForm.get(formName)?.hasError('isSize')) this.erroreStr = 'հեռախոսահամարը սխալ է';
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
        localStorage.setItem('user-date',JSON.stringify(this.frames.userData))
      })
    }
  }

  ngOnDestroy(){
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}

 

