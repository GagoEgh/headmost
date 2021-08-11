import { Component, OnInit } from '@angular/core';
import { FramesServService } from './shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './register/login/login.component';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public unsubscribe$ = new Subject()

  constructor(public frames: FramesServService,
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

    if (localStorage.getItem('loginAutorization')) {

      const token: any = localStorage.getItem('loginAutorization');
      this.frames.token = token;
      const date: any = localStorage.getItem('user-date')
      const result = JSON.parse(date)
      this.frames.userData = result;
      this.frames.userReg = false;

      this.frames.userInfo().pipe(takeUntil(this.unsubscribe$)).subscribe((el: any) => {
        this.frames.orderList = el.results;

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

  open() {
    const modalRef = this.modalService.open(LoginComponent);

  }

  close() {

    localStorage.removeItem('loginAutorization');
    localStorage.removeItem('user-date');
    //localStorage.removeItem('language')
    this.frames.sum = 0;
    this.frames.orderList = [];
    this.frames.token = '';
    this.frames.userReg = true;
    this.frames.showFrame();
    this.frames.userData = {
      address: '',
      city: 0,
      city_details: {
        id: 0,
        name_en: '',
        name_ru: '',
        name_hy: ''
      },
      comment: '',
      date_of_birth: '',
      image: '',
      phone_number: null,
      user: 0,
      user_details: {
        first_name: '',
        id: 0,
        is_active: false,
        is_staff: false,
        last_name: '',
        username: ''
      }
    };
    this.router.navigate(['/'])
  }

  getFrame() {
    this.router.navigate(['/']);
    this.frames.isImg = true;
    this.frames.isOrder = false;
    this.frames.validateForm.reset()
  }

  getMagnit() {
    this.router.navigate(['/magnit']);
    this.frames.isImg = true;
    this.frames.isOrder = false;
    this.frames.validateForm.reset()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

  changeLeng(leng: string) {
    this._translate.use(leng);
    this.frames.lang = leng;
    localStorage.setItem('language', this.frames.lang);
    this._translate.use(this.frames.lang);
    this._translate.get('_img-text-valid').pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.frames.placeholder = res["_placeholder"];
      })


  }

}
