import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-okoder',
  templateUrl: './okoder.component.html',
  styleUrls: ['./okoder.component.css']
})
export class OkoderComponent implements OnInit {
  public _subscribe$ = new Subject();
  @Input() validateForm: any;
  @Input() count: any;
  @Input() order: any;
  constructor(public activeModal: NgbActiveModal, public _translate: TranslateService,
    public frames: FramesServService, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  goUsOrder() {
    let okMsg: string = '';
    let errMsg: string = '';
    this._translate.get('_menu._user').subscribe((el) => {
      okMsg = el.orderOk;
      errMsg = el.orderErr
    })

    if (this.validateForm.valid && this.count != 1) {
      this.frames.userOrder(this.order).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
        this.toastr.success(okMsg);
        this.count++;
        this.frames.isdisible = true;
        this.router.navigate(['user/user-order']);
      }, (err) => {
        this.errOrder(errMsg)
      })
      this.activeModal.dismiss()
    }
  }

  errOrder(str: string) {
    this.toastr.error(str, '', {
      timeOut: 2000,
    });
    this.router.navigate(['/'])
  }

}
