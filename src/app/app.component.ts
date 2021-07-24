import { Component, OnInit } from '@angular/core';
import { FramesServService } from './shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './register/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public frames: FramesServService, private modalService: NgbModal, private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem('loginAutorization')) {
      const token: any = localStorage.getItem('loginAutorization');
      this.frames.token = token;
      const date: any = localStorage.getItem('user-date')
      const result = JSON.parse(date)
      this.frames.userData = result;
      this.frames.userReg = false;

      this.frames.userInfo().subscribe((el: any) => {
        this.frames.orderList = el.results;

        this.frames.orderList.forEach((obj: any) => {
          this.frames.sum += obj.created_frame_details.price;

        });

      })
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

}
