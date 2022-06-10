import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDetails } from 'src/app/modeles/CategoryDetails.modele';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class ImgCatalogService {

  constructor( public frames: FramesServService,private url: HttpClient,) { }

  public getCategory(): Observable<ServerResponce<CategoryDetails[]>> {
    return this.url.get<ServerResponce<CategoryDetails[]>>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_category)
}
}
