import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDetails } from 'src/app/modeles/CategoryDetails.modele';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class IdeaNavService {

  constructor(private url: HttpClient,public frames:FramesServService) { }

  public frameCategory(): Observable<ServerResponce<CategoryDetails[]>> {
    return this.url.get<ServerResponce<CategoryDetails[]>>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_created_frame_category+'?limit=1000')
  }
}
