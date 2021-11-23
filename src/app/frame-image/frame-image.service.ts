import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CategoryDetails } from '../interface/CategoryDetails';
import { Painding, ServerResponce } from '../interface/img-ramka';
import { WordResult } from '../interface/WordResult';
import { FramesServService } from '../shared/frames-serv.service';

@Injectable({
  providedIn: 'root'
})
export class FrameImageService {
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

  constructor(public frames: FramesServService, private url: HttpClient,
    public rout: Router, public spinner: NgxSpinnerService,) { }

  public letterGet(): Observable<WordResult[]> {
    let text = this.frames.text ? this.frames.text : null;
    return this.url.get<WordResult[]>(this.frames.api.worldApi + this.frames.api.api_img + this.frames.api.api_create_word + text + '/', {
        params: new HttpParams().set('color', this.painding.id.toString())
    });
}

  public imgColorGet(): Observable<ServerResponce<CategoryDetails[]>> {
    return this.url.get<ServerResponce<CategoryDetails[]>>(this.frames.api.worldApi + this.frames.api.api_utils + this.frames.api.api_color)
  }



  public letterColorFone(): void {
    this.spinner.show();
    this.frames.text = this.frames.validateForm.get('text')?.value;

    this.letterGet().subscribe((wordResult: WordResult[]) => {
        this.frames.letterImges = wordResult;
        this.frames.letterImges = this.frames.letterImges.filter(img => {
            return !img.not_found
        })

        this.frames.urlArr = this.rout.url.split('/');

        if (this.frames.urlArr[1] === 'frame') {
            this.rout.navigate([this.frames.urlArr[1] + '/create-img'], { queryParams: { type: this.frames.urlArr[1], text: this.frames.text } })
        }

        if (this.frames.urlArr[1] === 'magnit') {
            this.rout.navigate([this.frames.urlArr[1] + '/create-magnit'], { queryParams: { type: this.frames.urlArr[1], text: this.frames.text } })
        }

        setTimeout(() => {
            this.spinner.hide();
        }, 1000)

    })
}



}
