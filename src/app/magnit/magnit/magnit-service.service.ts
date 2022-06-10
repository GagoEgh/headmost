import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CardItemResults } from 'src/app/modeles/frame-response.modele';
import { LoginComponent } from 'src/app/register/login/login.component';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class MagnitServiceService {

  constructor(private url: HttpClient, public frames: FramesServService, public spinner: NgxSpinnerService) { }


  private magnetImg(obj: any): Observable<CardItemResults[]> {
    return this.url.post<CardItemResults[]>(this.frames.api.worldApi + this.frames.api.api_order + this.frames.api.api_card + this.frames.api.api_magnet + '/', obj,
      { headers: { 'Authorization': this.frames.token } })
  }

  public myMagnitOrder() {
    if (localStorage.getItem('loginAutorization')) {
      this.spinner.show();
      const imgs: any[] = [];
      this.frames.letterImges.forEach((i, index) => {
        const obj = {
          order_index: index,
          character: i.image.character,
          image: i.image.id,
          user_image: null,
        }
        imgs.push(obj)
      })

      const order = {
        word: this.frames.text.toUpperCase(),
        images: imgs,
      }

      if (!this.frames.apiPhoto) {
        order.images = order.images.map((img: any) => {
          if (img.character === undefined) {
            img.character = this.frames.letterChar;
            img.user_image = img.image;
            img.image = null;
          }
          return img;
        })
      }

      this.magnetImg(order).subscribe((orderCard: CardItemResults[]) => {
        this.frames.orderList = orderCard;
        this.frames.isOrder = true;
        this.spinner.hide()
      })
    } else {
      const modalRef = this.frames.modalService.open(LoginComponent);

    }

  }

}
