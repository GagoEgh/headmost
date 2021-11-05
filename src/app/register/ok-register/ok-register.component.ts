import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ok-register',
  templateUrl: './ok-register.component.html',
  styleUrls: ['./ok-register.component.css']
})
export class OkRegisterComponent implements OnInit {

 public congratulations:string='';
 public titlle:string = '';
  constructor(public activeModal: NgbActiveModal,public frames:FramesServService,
    public _translate:TranslateService) {}

  ngOnInit(): void {
    this._translate.get('Order.userData').subscribe((res:any)=>{
      this.congratulations = res.congratulations;
      this.titlle = res.congratulationsTitle;
    })
    this.frames.isRegister = true;
  }

}
