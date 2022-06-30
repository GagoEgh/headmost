import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { OrderResult, PromoCodeResults, ShipingResult } from 'src/app/modeles/order-response.modele';
import { FramesServService } from 'src/app/shared/frames-serv.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public isdisible = false;
  constructor(private url: HttpClient, public frames: FramesServService,public toastr: ToastrService,
  public router: Router,public _translate: TranslateService,) { }

  public deleteOrder(id: number): Observable<null> {
    return this.url.delete<null>(this.frames.api.worldApi + this.frames.api.api_order + this.frames.api.api_card + '/' + id + '/')
  }

  public promoCodePost(data: { price: number, code: string }): Observable<PromoCodeResults> {
    return this.url.post<PromoCodeResults>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_promocode + this.frames.api.api_check_promo, data)
  }


  public shipingMethod(): Observable<ServerResponce<ShipingResult[]>> {
    return this.url.get<ServerResponce<ShipingResult[]>>(this.frames.api.worldApi + this.frames.api.api_utils + '/' + this.frames.api.api_shipping)
  }


  public userOrder(obj: any) {
    return this.url.post(this.frames.api.worldApi + this.frames.api.api_order + this.frames.api.api_order + '/', obj)
  }

  public errOrder(str: string): void {
    this.toastr.error(str, '', {
      timeOut: 1000,
    });
    this.router.navigate(['/'])
  }

 
}
