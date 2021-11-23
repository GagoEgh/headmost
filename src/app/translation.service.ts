import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TranslationService implements TranslateLoader {

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    // https://sirun-bar-api.annaniks.com/static/languages/en.json
    return this.http.get(`https://sirun-bar-api.annaniks.com/static/languages/${lang}.json`)
      .pipe(map((response) => {
        console.log(response);
        
        return response;
      }));
  }
}