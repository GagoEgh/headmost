import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FrameDetalis } from 'src/app/modeles/frame-response.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class IdeaImageService {
  public ideaImg: any = {};
  public isIdeaFrame: boolean = false;
  constructor(
    private url: HttpClient,
    public frames: FramesServService) { }

  public imgCategory(id: number): Observable<FrameDetalis> {
    return this.url.get<FrameDetalis>(this.frames.api.worldApi + this.frames.api.api_img + this.frames.api.api_created_frame + `/${id}/`)
  }
}
