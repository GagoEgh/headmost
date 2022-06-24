import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/app/modeles/loginDto';
import { RegisterResult } from 'src/app/modeles/register-response.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogin:boolean = false;
  constructor(private url: HttpClient, public frames:FramesServService) { }

  public userLogin(loginDto: LoginDto): Observable<RegisterResult> {
    return this.url.post<RegisterResult>(this.frames.api.worldApi + this.frames.api.api_userdetails + this.frames.api.api_login, loginDto,)
  }

}
