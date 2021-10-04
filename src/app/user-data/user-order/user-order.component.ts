import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OkSmsComponent } from '../ok-sms/ok-sms.component';



@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit, AfterViewChecked {
  public _subscribe$ = new Subject();
  userOrders: any[] = [];
  scrollUpDistance = 1.5;
  scrollDistance = 2;
  price: string = '';
  array: any[] = [];
  throttle = 300;

  constructor(public frames: FramesServService,public modalService: NgbModal,
     private spinner: NgxSpinnerService, public _translate: TranslateService) { }

  ngOnInit(): void {
    this.frames.offset = 0;
    this.userOrders;
    this.appendItems();
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    // this.userOrders;
  }

  appendItems() {
    this.spinner.show()
    this.frames.userOrderGet().pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {

      this.userOrders.push(...el.results)
      this.frames.offset += 10;
      this.frames.isMyOrder = true;
      this.spinner.hide()

    })
  }



  showPrice(arr: any, num: number) {
    this.price = arr.created_frame_details.price;
    return this.price
  }

  onScrollDown(ev: any) {

    if (this.userOrders.length < 10) {
      this.userOrders
    } else {
      this.appendItems();
    }

    //this.userOrders;
  }

  okSms = '';
  deleteUsOrder(item: any) {
    this.frames.userOrderDel(item.id).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {

      this.okSms = el.message
      const modalRef = this.modalService.open(OkSmsComponent);
      this.userOrders = this.userOrders.filter((val) => val.id != item.id )
         
      setTimeout(() => {
        modalRef.dismiss()
      }, 2000)


    })

  }


  addOrder(index: number) {
    this.spinner.show()
    let created_frame = '';
    this.userOrders[index].order_items_details.forEach((el: any) => {
      created_frame = el.created_frame

    })

    const obj = {
      created_frame: created_frame,
      user: this.frames.userData.user
    }

    this.frames.orderCard(obj).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.frames.orderList.push(el);
      this.spinner.hide()

    })

  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
