import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnlyComponent } from '../only/only.component';
import { DeleteComponent } from '../delete/delete.component';





@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit, AfterViewChecked, OnChanges {
  public _subscribe$ = new Subject();
  userOrders: any[] = [];
  scrollUpDistance = 1.5;
  scrollDistance = 2;
  price: string = '';
  array: any[] = [];
  throttle = 300;
  okSms = '';

  constructor(public frames: FramesServService, public modalService: NgbModal,
    private spinner: NgxSpinnerService, public _translate: TranslateService) { }
  ngOnChanges(changes: SimpleChanges): void {
    // this.showItem(this.obj,this.num)

  }


  ngOnInit(): void {
    this.frames.offset = 0;
    this.userOrders;
    this.appendItems();
  }




  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);

  }

  appendItems() {
    this.spinner.show()
    this.frames.userOrderGet().pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      el.results.forEach((item: any) => {
        item.order_items_details.forEach((obj: any) => {
          obj.isBlock = false;
        
        })
        item.order_items_details[0].isBlock = true;
      })
      
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
  }


  deleteUsOrder(item: any) {
    const modalRef = this.modalService.open(DeleteComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.userOrders = this.userOrders;
    modalRef.result.then((result) => {
      this.userOrders = result;
    });




  }

  addOrder(index: number) {
    this.spinner.show();
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

  showItem(order: any) {
    if (order.order_items_details.length > 1) {
      for (let j = 1; j < order.order_items_details.length; j++) {
        order.order_items_details[j].isBlock = !order.order_items_details[j].isBlock
      }

    } else {
      const modalRef = this.modalService.open(OnlyComponent);

      setTimeout(() => {
        modalRef.dismiss()
      }, 2000)
    }
  }

  checkImage(img: string): boolean {
    return img.startsWith('http') ? true : false
  }

}
