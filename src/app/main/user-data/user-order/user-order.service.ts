import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { OrderResult } from 'src/app/modeles/order-response.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  constructor(private url: HttpClient,public frames:FramesServService) { }

  public userOrderGet(): Observable<ServerResponce<OrderResult[]>> {
    return this.url.get<ServerResponce<OrderResult[]>>(this.frames.api.worldApi + this.frames.api.api_order + this.frames.api.api_order + '/?user=' + `${this.frames.limit}&offset=${this.frames.offset}&user=${this.frames.userData.user}`)
}
}
