import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnlyComponent } from '../only/only.component';
import { DeleteComponent } from '../delete/delete.component';
import { NgImageSliderComponent } from 'ng-image-slider';

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
  okSms = '';

  constructor(public frames: FramesServService, public modalService: NgbModal,
    private spinner: NgxSpinnerService, public _translate: TranslateService) { }



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
          obj.isDisabled = false;
          obj.isPrev = false;

        })
        item.order_items_details[0].isBlock = true;
      })

      this.userOrders.push(...el.results)
      this.frames.offset += 10;
      this.frames.isMyOrder = true;
      this.spinner.hide();
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


  checkImage(img: string): boolean {
    return img.startsWith('http') ? true : false
  }

  public marginLeft(orderItems: any) {
    const margin = {
      'margin-left': '0'
    }
    let length = orderItems.created_frame_details.frame_images.length

    if (length <= 4) margin['margin-left'] = '55%';
    if (length === 5) margin['margin-left'] = '40%';
    if (length === 6) margin['margin-left'] = '25%';
    if (length === 7) margin['margin-left'] = '20%';
    if (length === 8) margin['margin-left'] = '10%';

    if (window.innerWidth <= 768) {
      if(length>2 && length<=9){
        margin['margin-left'] = '0%'
        return margin
      }

     
    }

    if (window.innerWidth <= 1025) {
      if (length <= 4) {
        margin['margin-left'] = '45%'
        return margin
      }
      if (length === 5) {
        margin['margin-left'] = '27%'
        return margin
      }
      if (length === 6) {
        margin['margin-left'] = '15%'
        return margin
      }
      if (length === 7) {
        margin['margin-left'] = '6%'
        return margin
      }
      if (length === 8) {
        margin['margin-left'] = '0%'
        return margin
      }

    }

    return margin
  }

  public prevOrder(order: any, num: number) {

    if (num <= (order.order_items_details.length - 1)) {
      order.order_items_details[num].isBlock = false
      order.order_items_details[num - 1].isBlock = true
      order.order_items_details[num - 1].isDisabled = false
    }

    if ((num - 1) == 0) {
      order.order_items_details[num - 1].isDisabled = false
      order.order_items_details[num - 1].isPrev = false;
    }

  }

  public nextOrder(order: any, num: number) {
    if (order.order_items_details.length === 1) {
      const modalRef = this.modalService.open(OnlyComponent);
      setTimeout(() => {
        modalRef.dismiss()
      }, 2000)
    }

    if (num < (order.order_items_details.length - 1)) {
      order.order_items_details[num].isBlock = false
      order.order_items_details[num + 1].isBlock = true
      order.order_items_details[num + 1].isPrev = true
    }

    if ((num + 1 == (order.order_items_details.length - 1))) {
      order.order_items_details[num + 1].isDisabled = true
    }
  }
}