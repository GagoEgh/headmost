import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { OrderResult } from 'src/app/interface/order-response';
import { FormGroup } from '@angular/forms';
import { OkoderService } from './okoder.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-okoder',
  templateUrl: './okoder.component.html',
  styleUrls: ['./okoder.component.css']
})
export class OkoderComponent implements OnInit {
  public _subscribe$ = new Subject();
  @Input() validateForm :FormGroup | undefined;
  @Input() count: number | undefined;
  @Input() order: any;
  constructor(public activeModal: NgbActiveModal, public _translate: TranslateService,
  public orderService:OrderService, public okServer:OkoderService, public frames: FramesServService, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void { 
  }

  public goUsOrder(): void {
    let okMsg: string = '';
    let errMsg: string = '';
    this._translate.get('Menu.user').subscribe((el) => {
      okMsg = el.orderOk;
      errMsg = el.orderErr
    })

    if (this.validateForm?.valid && this.count != 1) {
      this.okServer.userOrder(this.order).pipe(takeUntil(this._subscribe$)).subscribe((order: ServerResponce<OrderResult[]>) => {
        this.toastr.success(okMsg);
        this.count!++;
        this.orderService.isdisible = true;
        this.router.navigate(['user/user-order']);
      }, (err) => {
        this.errOrder(errMsg)
      })
      this.activeModal.dismiss()
    }
  }

  public errOrder(str: string): void {
    this.toastr.error(str, '', {
      timeOut: 1000,
    });
    this.router.navigate(['/'])
  }

}
