import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './register/register-module';
import { UserGuard } from './user-data/userGuard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrMsgComponent } from './idea/err-msg/err-msg.component';
import { ToastrModule } from 'ngx-toastr';

import { CookieModule } from 'ngx-cookie';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'https://admin.gift4u.am/media/static/languages/', '.json');
}

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ErrMsgComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    RegisterModule,
    InfiniteScrollModule,
    CookieModule.forRoot(),
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
       // useClass: TranslationService,     
        deps: [HttpClient]
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [{ provide: NZ_I18N, useValue: en_US }, UserGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }