import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { PromoCodeResults, ShipingResult } from 'src/app/interface/order-response';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public isdisible = false;
  constructor(private url: HttpClient, public frames: FramesServService) { }

  public deleteOrder(id: number): Observable<null> {
    return this.url.delete<null>(this.frames.api.worldApi + this.frames.api.api_order + this.frames.api.api_card + '/' + id + '/',
      { headers: { 'Authorization': this.frames.token } }
    )
  }

  public promoCodePost(data: { price: number, code: string }): Observable<PromoCodeResults> {
    return this.url.post<PromoCodeResults>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_promocode + this.frames.api.api_check_promo, data)
  }


  public shipingMethod(): Observable<ServerResponce<ShipingResult[]>> {
    return this.url.get<ServerResponce<ShipingResult[]>>(this.frames.api.worldApi + this.frames.api.api_utils + '/' + this.frames.api.api_shipping)
  }
}
