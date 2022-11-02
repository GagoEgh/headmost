import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TranslationService implements TranslateLoader {

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {

    return this.http.get(`http://annaniks.com:8014/static/languages/${lang}.json`)
      .pipe(map((response) => {
        return response;
      }));
  }
}
