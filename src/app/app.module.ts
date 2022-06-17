// module
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './register/register-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';
import { ClickOutsideModule } from 'ng-click-outside';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//component
import { AppComponent } from './app.component';
import { ErrMsgComponent } from './idea/err-msg/err-msg.component';

//language
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

//guard
import { UserGuard } from './user-data/userGuard';

//loader
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://admin.gift4u.am/media/static/languages/', '.json');
}

//data
import { registerLocaleData } from '@angular/common';
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
  providers: [{ provide: NZ_I18N, useValue: en_US }, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
