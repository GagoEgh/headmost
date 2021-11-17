import { FramesServService } from './shared/frames-serv.service';
import { LoginComponent } from './register/login/login.component';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ServerResponce } from './interface/img-ramka';
import { UserData } from './interface/UserInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public unsubscribe$ = new Subject();
  constructor(public frames: FramesServService, private spinner: NgxSpinnerService,
    private _translate: TranslateService,
    private modalService: NgbModal,
    private router: Router) {
    this._translate.use(this.frames.lang);
    const lang: any = localStorage.getItem('language');
    this.frames.lang = lang;
    this._translate.setDefaultLang(this.frames.lang)
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
      this.frames.userInfo().pipe(takeUntil(this.unsubscribe$)).subscribe((serverResponse: ServerResponce<[]>) => {
        this.frames.orderList = serverResponse.results;
        this.frames.orderList.forEach((obj: any) => {
          this.frames.sum += obj.created_frame_details.price;
        });
      })
    }
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
    this.router.navigate(['/']);
    this.frames.isImg = true;
    this.frames.isOrder = false;
    this.frames.conteinerHeight();
    this.frames.validateForm.reset()
  }

  public getMagnit(): void {
    this.frames.validateForm.reset()
    this.router.navigate(['/magnit/form-magnit']);
    this.frames.isImg = true;
    this.frames.isOrder = false;

  }

  public changeLeng(leng: string):void {
    this.spinner.show();
    this._translate.use(leng);
    this.frames.lang = leng;
    localStorage.setItem('language', this.frames.lang);
    this._translate.use(this.frames.lang);
    this._translate.get('ImgTextValid').pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: {[key:string]:string}) => {
        this.frames.placeholder = res["placeholder"];
        setTimeout(() => {
          this.spinner.hide()
        }, 300)
      })
  }

  private ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }
}


