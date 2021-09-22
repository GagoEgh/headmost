import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-okoder',
  templateUrl: './okoder.component.html',
  styleUrls: ['./okoder.component.css']
})
export class OkoderComponent implements OnInit {
  public _subscribe$ = new Subject();
  @Input()validateForm:any;
  @Input()count:any;
  @Input()order:any;
  constructor(public activeModal: NgbActiveModal,public _translate:TranslateService,
    public frames:FramesServService,public router:Router) { }

  ngOnInit(): void {

  }

  goUsOrder(){
    if (this.validateForm.valid && this.count != 1){
           this.frames.userOrder(this.order).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
        this.count++;
        this.frames.isdisible = true;
        this.router.navigate(['user/user-order']);
       // modalRef.dismiss();
        this.activeModal.dismiss()
      })
    }

 
  }
}
