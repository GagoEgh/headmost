import { FramesServService } from './shared/frames-serv.service';
import { LoginComponent } from './register/login/login.component';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ServerResponce } from './interface/img-ramka';
import { UserData } from './interface/UserAllData';




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


  scrollToTopByChangeRoute() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    let left = 0;
    if (window.innerWidth <= 960 && this.frames.isSilki) {

    }
  }

  open() {
    const modalRef = this.modalService.open(LoginComponent);

  }

  close() {

    localStorage.removeItem('loginAutorization');
    localStorage.removeItem('user-date');
    this.frames.sum = 0;
    this.frames.orderList = [];
    this.frames.token = '';
    this.frames.userReg = true;
    this.frames.showFrame();
    this.frames.userData = new UserData();
    this.router.navigate(['/'])
  }

  getFrame() {
    this.router.navigate(['/']);
    this.frames.isImg = true;
    this.frames.isOrder = false;
    this.frames.validateForm.reset()
  }

  getMagnit() {
    this.frames.validateForm.reset()
    this.router.navigate(['/magnit/form-magnit']);
    this.frames.isImg = true;
    this.frames.isOrder = false;

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

  changeLeng(leng: string) {
    this.spinner.show();
    this._translate.use(leng);
    this.frames.lang = leng;
    localStorage.setItem('language', this.frames.lang);
    this._translate.use(this.frames.lang);
    this._translate.get('ImgTextValid').pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.frames.placeholder = res["placeholder"];
        setTimeout(() => {
          this.spinner.hide()
        }, 300)
      })
  }

}


