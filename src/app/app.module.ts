// module
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './auth/register-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';
import { ClickOutsideModule } from 'ng-click-outside';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//component
import { AppComponent } from './app.component';
import { ErrMsgComponent } from './global pages/ideas/err-msg/err-msg.component';

//language
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

//guard
import { UserGuard } from './main/user-data/userGuard';

//loader
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.API_URL}/media/static/languages/`, '.json');
}

//data
import { registerLocaleData } from '@angular/common';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { environment } from 'src/environments/environment';

registerLocaleData(en);

const Module = [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  ClickOutsideModule,
  RegisterModule,
  AppRoutingModule,
];

const AnimateModule = [
  BrowserAnimationsModule,
  InfiniteScrollModule,
  FontAwesomeModule,
];

const TranslateCoockieModule = [
  CookieModule.forRoot(),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      // useClass: TranslationService,
      deps: [HttpClient]
    }
  }),
];

@NgModule({
  declarations: [
    AppComponent,
    ErrMsgComponent,
  ],

  imports: [
    ...Module,
    ...AnimateModule,
    ...TranslateCoockieModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    },
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
