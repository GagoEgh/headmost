import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit,ControlValueAccessor  {
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

  ngOnInit(): void {
    console.log(this.control)
  }
  

}
