import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { OkSmsComponent } from '../ok-sms/ok-sms.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public _translate: TranslateService,
    public frames: FramesServService, public modalService: NgbModal) { }
  @Input() item: any;
  @Input() userOrders:any;
  _subscribe$ = new Subject();
  okSms = '';
  ngOnInit(): void {
  }

  noDelete() {
    this.activeModal.close()
  }

  delteteBlock() {

    this.frames.userOrderDel(this.item.id).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.okSms = el.message
      const modalRef = this.modalService.open(OkSmsComponent);
       this.userOrders = this.userOrders.filter((val:any) => val.id != this.item.id)

        setTimeout(() => {
          modalRef.dismiss()
        }, 1500)

        this.activeModal.close();

    })

  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }

}
