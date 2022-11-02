import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TranslationService implements TranslateLoader {

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {

    return this.http.get(`${environment.API_URL}/static/languages/${lang}.json`)
      .pipe(map((response) => {
        return response;
      }));
  }
}
