import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDto } from 'src/app/modeles/changePasswordDto';
import { EditDto } from 'src/app/modeles/editDto';
import { UserDetalis } from 'src/app/modeles/register-response.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private url: HttpClient, public frames: FramesServService) { }

  public editUser(obj: EditDto): Observable<UserDetalis> {
    return this.url.put<UserDetalis>(this.frames.api.worldApi + this.frames.api.api_userdetails + this.frames.api.api_edit, obj,
      { headers: { 'Authorization': this.frames.token } })
  }

  
  public changePasword(newPassword:ChangePasswordDto){
    return this.url.put(this.frames.api.worldApi+this.frames.api.api_userdetails +this.frames.api.api_changePass,newPassword,
      { headers: { 'Authorization': this.frames.token } })
  }

}
