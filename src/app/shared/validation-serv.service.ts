import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({
    providedIn:'root'
})
export class ValidationServService{

  userNameChar(control: FormControl) {
    const regExp = /[0-9]/;
    if (regExp.test(control.value)) {
      return {
        userNameChar: true
      }
    }
    return false
  }
    
  emailValid(control: FormControl) {
    const regExp = /^([a-z0-9._%+-])+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!regExp.test(control.value)) {
      return {
        isEmail: true
      }
    }
    return false
  }

  PhoneNumberLength(control: FormControl) {
    const size = 9;
    if (control.value && control.value.length < 9) {
      return {
        isSize: true
      }
    }
    return false
  }
}