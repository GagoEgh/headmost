import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { OrderResult } from 'src/app/interface/order-response';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class OkoderService {

  constructor(private url: HttpClient,public frames:FramesServService) { }

  public userOrder(obj: OrderResult): Observable<ServerResponce<OrderResult[]>> {
    return this.url.post<ServerResponce<OrderResult[]>>(this.frames.api.worldApi + this.frames.api.api_order + this.frames.api.api_order + '/', obj,
        { headers: { 'Authorization': this.frames.token } })
}

}
