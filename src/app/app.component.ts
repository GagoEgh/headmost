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
      const list: any = localStorage.getItem('order-list');
      this.frames.orderList = JSON.parse(list);

      console.log(this.frames.orderList)


    }

  }


  open() {
    const modalRef = this.modalService.open(LoginComponent);

  }

  close() {

    localStorage.removeItem('loginAutorization');
    localStorage.removeItem('user-date');
    localStorage.removeItem('order-list');
    localStorage.removeItem('sum')
    this.frames.orderList = [];
    this.frames.token = '';
    this.frames.userReg = true;
    this.frames.showFrame();
    this.router.navigate(['/'])
  }

}
