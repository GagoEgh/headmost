import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FramesServService } from 'src/app/shared/frames-serv.service';
@Component({
  selector: 'app-ok-register',
  templateUrl: './ok-register.component.html',
  styleUrls: ['./ok-register.component.css']
})
export class OkRegisterComponent implements OnInit {

  
  constructor(public activeModal: NgbActiveModal,public frames:FramesServService) {}

  ngOnInit(): void {
    this.frames.isRegister = true;
  }

}
