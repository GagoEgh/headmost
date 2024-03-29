import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { CategoryDetails } from 'src/app/modeles/CategoryDetails.modele';
import { Painding, ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { WordResult } from 'src/app/modeles/WordResult.module';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FrameService } from '../frame/frame/frame.service';


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
    public frameServis: FrameService,
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
    this._productPrice = 0;
    this._productPrice = this._lettersQuantity * price;
  }

  public getPrice() {
    return this._productPrice
  }

  public clearPrice() {
    this._productPrice = 0
  }

  public letterColorFone(text?: string, frame?: number, background?: number): void {
    this.spinner.show();
    this.frames.text = text ? text : this.frames.validateForm.get('text')?.value;
    const frameId = frame ? frame : this.frames?.frame?.id;
    const backgroundId = background ? background : this.frames?.background?.id

    this.letterGet()
      .subscribe((wordResult: WordResult[]) => {
        this.frames.frame = this.frameServis.framesImge.find(
          (item) => item.id === frameId
        );
        this.frames.background = this.frames.div.find(
          (item: any) => item.id === backgroundId
        )

     
        this.frames.letterImges = wordResult;
        this.frames.letterImges = this.frames.letterImges.filter(img => {
          return !img.not_found
        })

        this.frames.urlArr = this.rout.url.split('/');
        
        if (this.frames?.letterImges?.length) {
          this.frames.isOrder = false;
          this.frames.isImg = false;
        }
        
        if (this.frames.urlArr[1] === 'frame') {
          this.rout.navigate([this.frames.urlArr[1] + '/create-img'],
            {
              queryParams:
              {
                type: this.frames.urlArr[1],
                text: this.frames.text,
                frameId: frameId,
                background: backgroundId
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
