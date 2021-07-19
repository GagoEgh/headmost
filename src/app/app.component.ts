import { Component } from '@angular/core';
import { FramesServService } from './shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './register/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public frames: FramesServService, private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(LoginComponent);
  }

  close() {
    localStorage.removeItem('loginAutorization');
    this.frames.token = 'Token ';
    this.frames.userReg = true;
    this.frames.showFrame();
    this.frames.sum = 0;
  }

}
