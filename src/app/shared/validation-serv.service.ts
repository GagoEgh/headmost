import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({
    providedIn:'root'
})
export class ValidationServService{
    
  emailValid(control: FormControl) {
    const regExp = /^([a-z0-9._%+-])+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!regExp.test(control.value)) {
      return {
        isEmail: true
      }
    }
    return false
  }
}