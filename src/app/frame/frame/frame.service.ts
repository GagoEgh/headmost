import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BgDetails } from 'src/app/interface/CategoryDetails';
import { FramesImg } from 'src/app/interface/ImageResponse';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class FrameService {
  public framesImge: FramesImg[] = [];

  
  constructor(private url: HttpClient, public frames: FramesServService,) { }

  public framesFoneGet(): Observable<ServerResponce<BgDetails[]>> {
    return this.url.get<ServerResponce<BgDetails[]>>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_bgr)
  }

  public getFrames(): Observable<ServerResponce<FramesImg[]>> {
    return this.url.get<ServerResponce<FramesImg[]>>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_frame)
  }
}
