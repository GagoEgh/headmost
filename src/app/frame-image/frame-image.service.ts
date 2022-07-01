import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { CategoryDetails } from '../modeles/CategoryDetails.modele';
import { Painding, ServerResponce } from '../modeles/img-ramka.modele';
import { WordResult } from '../modeles/WordResult.module';

import { FramesServService } from '../shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class FrameImageService {

  private _lettersQuantity: number = 0
  private _productPrice?: number

  public painding: Painding = {
    values: {
      colored: false,
      withandblack: true,
      sepia: false,
      color: 'black',
      child: 'white',
    },
    imgs: [],
    id: 3,
    categoryId: 1
  };

  constructor(
    public frames: FramesServService,
    private url: HttpClient,
    public rout: Router,
    public spinner: NgxSpinnerService,
  ) { }

  public letterGet(): Observable<WordResult[]> {
    let text = this.frames.text ? this.frames.text : null;
    return this.url.get<WordResult[]>(this.frames.api.worldApi + this.frames.api.api_img + this.frames.api.api_create_word + text + '/', {
      params: new HttpParams().set('color', this.painding.id.toString())
    });
  }

  public imgColorGet(): Observable<ServerResponce<CategoryDetails[]>> {
    return this.url.get<ServerResponce<CategoryDetails[]>>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_color)
  }

  public setLettersQuantity(num: number) {
    this._lettersQuantity = 0
    this._lettersQuantity = num
  }
  public setFramePrice(price: number) {
    this._productPrice = 0
    this._productPrice = this._lettersQuantity * price
  }

  public getPrice() {
    return this._productPrice
  }

  public clearPrice() {
    this._productPrice = 0
  }

  public letterColorFone(text?: string): void {
    this.spinner.show();    
    this.frames.text = text ? text : this.frames.validateForm.get('text')?.value;

    this.letterGet()
      .subscribe((wordResult: WordResult[]) => {

        this.frames.letterImges = wordResult;
        this.frames.letterImges = this.frames.letterImges.filter(img => {
          return !img.not_found
        })

        this.frames.urlArr = this.rout.url.split('/');

        if (this.frames.urlArr[1] === 'frame') {
          this.rout.navigate([this.frames.urlArr[1] + '/create-img'],
            {
              queryParams:
              {
                type: this.frames.urlArr[1],
                text: this.frames.text
              }
            })

        }

        if (this.frames.urlArr[1] === 'magnit') {
          this.rout.navigate([this.frames.urlArr[1] + '/create-magnit'],
            {
              queryParams: {
                type: this.frames.urlArr[1],
                text: this.frames.text
              }
            })
        }

        setTimeout(() => {
          this.spinner.hide();
        }, 1000)

      })
  }

}
