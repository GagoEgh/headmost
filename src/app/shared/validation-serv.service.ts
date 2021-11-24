import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class ValidationServService {

  public userNameChar(control: FormControl): object | null {
    const regExp = /[0-9]/;
    if (regExp.test(control.value)) {
      return {
        userNameChar: true
      }
    }
    return null
  }

  emailValid(control: FormControl) {
    const regExp = /^([A-Za-z0-9._%+-])+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!regExp.test(control.value)) {
      return {
        isEmail: true
      }
    }
    return null
  }

  public PhoneNumberLength(control: FormControl): object | null {
    const size = 9;
    if (control.value && control.value.length < 9) {
      return {
        isSize: true
      }
    }
    return null
  }

}