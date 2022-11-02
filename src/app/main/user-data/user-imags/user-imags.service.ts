import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserImage } from 'src/app/modeles/ImageResponse.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class UserImagsService {

  constructor(private url: HttpClient, public frames: FramesServService) { }

  public userImage(obj: FormData): Observable<UserImage> {
    return this.url.post<UserImage>(this.frames.api.worldApi + this.frames.api.api_img + this.frames.api.api_user_image + '/', obj)
  }

  public deleteUserImage(id: number): Observable<null> {
    return this.url.delete<null>(this.frames.api.worldApi + this.frames.api.api_img + this.frames.api.api_user_image + `/${id}/`)
  }

}
