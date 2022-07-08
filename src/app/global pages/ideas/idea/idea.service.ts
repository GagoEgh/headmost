import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FrameDetalis } from 'src/app/modeles/frame-response.modele';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private url: HttpClient,public frames:FramesServService) { }

  public frameCategoryImg(category: string, predifined: number, offset: number): Observable<ServerResponce<FrameDetalis[]>> {
    return this.url.get<ServerResponce<FrameDetalis[]>>(this.frames.api.worldApi + this.frames.api.api_img + this.frames.api.api_created_frame + `/?created_frame_category=${category}&is_predefined=${predifined}&limit=50&offset=${offset}`)
  }
}
