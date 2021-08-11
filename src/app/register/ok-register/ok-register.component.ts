import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-ok-register',
  templateUrl: './ok-register.component.html',
  styleUrls: ['./ok-register.component.css']
})
export class OkRegisterComponent implements OnInit {

  _congratulations='';
  _titlle = '';
  constructor(public activeModal: NgbActiveModal,public frames:FramesServService,
    public _translate:TranslateService) {}

  ngOnInit(): void {
    this._translate.get('_order._user-data').subscribe((res:any)=>{
      this._congratulations = res._congratulations;
      this._titlle = res._congratulationsTitle;
    })
    this.frames.isRegister = true;
  }

}
