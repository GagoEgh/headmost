import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Edit, UserDetalis } from 'src/app/modules/register-response.module';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private url: HttpClient, public frames: FramesServService) { }

  public editUser(obj: Edit): Observable<UserDetalis> {
    return this.url.put<UserDetalis>(this.frames.api.worldApi + this.frames.api.api_userdetails + this.frames.api.api_edit, obj,
      { headers: { 'Authorization': this.frames.token } })
  }

}
