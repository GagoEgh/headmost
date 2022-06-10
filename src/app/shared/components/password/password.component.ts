import { Component, OnInit, Optional, Self } from '@angular/core';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: PasswordComponent,
  //     multi: true
  //   }
  // ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
  faEye: any = faEye;
  faEyeLowVision: any = faEyeLowVision;
  isShow = false;
  value: string = '';

  constructor(
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this;
  }

  inputValueCahnge = (value: string) => { };
  onBlur = () => { };

  showBlur() {
    this.onBlur()
  }

  changeValue(event: any) {
    this.inputValueCahnge(event.target.value)
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.inputValueCahnge = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  ngOnInit(): void {}

  showEye() {
    this.isShow = !this.isShow
  }
}
