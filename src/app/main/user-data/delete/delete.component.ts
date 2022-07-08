import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { OkSmsComponent } from '../ok-sms/ok-sms.component';
import { DeleteService } from './delete.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public _translate: TranslateService,
    public deleteService: DeleteService, public frames: FramesServService, public modalService: NgbModal) { }
  @Input() item: any;
  @Input() userOrders: any;
  private _subscribe$ = new Subject();
  private okSms = '';

  ngOnInit(): void {
  }

  public noDelete(): void {
    this.activeModal.close(this.userOrders)
  }

  public delteteBlock(): void {
    this.deleteService.userOrderDel(this.item.id)
      .pipe(takeUntil(this._subscribe$))
      .subscribe((sms: { message: string }) => {
        this.okSms = sms.message
        const modalRef = this.modalService.open(OkSmsComponent);
        this.userOrders = this.userOrders.filter((val: any) => val.id != this.item.id);
        this.activeModal.close(this.userOrders);
        setTimeout(() => {
          modalRef.dismiss()
        }, 500)

      })

  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }

}
