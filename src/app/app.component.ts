import { FramesServService } from './shared/frames-serv.service';
import { LoginComponent } from './register/login/login.component';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { UserData } from './modeles/UserInfo.module';
import { FrameImageService } from './frame-image/frame-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public unsubscribe$ = new Subject();
  constructor(
    public frames: FramesServService,
    private cookie: CookieService,
    private spinner: NgxSpinnerService,
    private _translate: TranslateService,
    private modalService: NgbModal,
    public imgService: FrameImageService,
    private router: Router) {
    const lang: any = this.cookie.get('lang');
    let activeLanguage = lang ?? 'hy';
    if (!lang) {
      this.cookie.put('lang', activeLanguage)
    }
    this._translate.use(activeLanguage);
    this.frames.lang = activeLanguage
  }


  ngOnInit(): void {
    this.scrollToTopByChangeRoute();
    this.frames.cityPlaceholder();
    if (localStorage.getItem('loginAutorization')) {
      const token: any = localStorage.getItem('loginAutorization');
      this.frames.token = token;
      const date: any = localStorage.getItem('user-date')
      const result = JSON.parse(date)
      this.frames.userData = result;
      this.frames.userReg = false;
      console.log('date',result)
      this.getUserInfo(result.user);
    }
  }


  getUserInfo(id:number) {
    this.spinner.show();
    this.frames.getUserOrder(id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (res: any) => {
        this.frames.orderList = res.results;
        this.frames.isGet = true;
        this.frames.setOrdersDate(this.frames.orderList);
        this.frames.orderList.forEach((obj: any) => {
          this.frames.sum += obj.created_frame_details.price;
        });
        console.log('frames.sum',this.frames.sum)
        this.spinner.hide();
      }
    })

    // this.frames.userInfo()
    //   .pipe(
    //     takeUntil(this.unsubscribe$),
    //     switchMap((serverResponse: any) => {
    //     //  this.spinner.show();
    //       return this.frames.getUserOrder(serverResponse.results[0].user)
    //     })
    //   ).subscribe({
    //     next: (res: any) => {
    //       this.frames.orderList = res.results;
    //       this.frames.isGet = true;
    //       this.frames.orderList.forEach((obj: any) => {
    //         this.frames.sum += obj.created_frame_details.price;
    //       });
    //       this.spinner.hide();
    //     }
    //   })
  }

  public scrollToTopByChangeRoute() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }


  public open(): void {
    const modalRef = this.modalService.open(LoginComponent);

  }

  public close(): void {
    localStorage.removeItem('loginAutorization');
    localStorage.removeItem('user-date');
    this.frames.sum = 0;
    this.frames.orderList = [];
    this.frames.token = '';
    this.frames.userReg = true;
    this.frames.showFrame();
    this.frames.userData = {} as UserData;
    this.router.navigate(['/'])
  }

  public getFrame(): void {
    this.router.navigate(['/'], { queryParamsHandling: 'merge' });
    this.frames.isImg = true;
    this.frames.isOrder = false;
    this.frames.conteinerHeight();
    this.frames.validateForm.reset();
    if (this.frames.validateForm.get("text")?.value == null) {
      this.imgService.clearPrice()
    }
  }

  public getMagnit(): void {
    this.frames.validateForm.reset()
    this.router.navigate(['/magnit/form-magnit'], { queryParamsHandling: 'merge' });
    this.frames.isImg = true;
    this.frames.isOrder = false;

  }

  public changeLeng(language: string): void {
    this.spinner.show();

    this.cookie.put('lang', language);
    this._translate.use(language);
    this.frames.lang = language;
    window.location.reload()
    this._translate.get('ImgTextValid').pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: { [key: string]: string }) => {
        this.frames.placeholder = res["placeholder"];
        this.spinner.hide()
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }
}


