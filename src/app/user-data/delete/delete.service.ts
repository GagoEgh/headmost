import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private url: HttpClient,public frames:FramesServService) { }

  public userOrderDel(id: number): Observable<{ message: string }> {
    return this.url.get<{ message: string }>(this.frames.api.worldApi + this.frames.api.api_order + this.frames.api.api_order + '/' + id + '/hide/')
}
}
