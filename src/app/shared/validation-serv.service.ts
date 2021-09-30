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
    return null
  }
    
  emailValid(control: FormControl) {
    const regExp = /^([a-z0-9._%+-])+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!regExp.test(control.value)) {
      return {
        isEmail: true
      }
    }
    return null
  }

  PhoneNumberLength(control: FormControl) {
    const size = 9;
    if (control.value && control.value.length < 9) {
      return {
        isSize: true
      }
    }
    return null
  }
  bigDate(control: FormControl) {
    const nowDate = new Date(control.value);
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
      
    if ((nowYear>year)||(nowYear===year&&nowMonth>month)||(nowYear===year&&nowMonth===month&&nowDay>day)) {
      return{
        bigDate:true
      }
    }
    return null

  }

}