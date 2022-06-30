import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnlyComponent } from '../only/only.component';
import { DeleteComponent } from '../delete/delete.component';
import { ServerResponce } from 'src/app/modeles/img-ramka.modele';
import { OrderResult } from 'src/app/modeles/order-response.modele';
import { CardItemResults } from 'src/app/modeles/frame-response.modele';
import { UserOrderService } from './user-order.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TenkyuComponent } from './tenkyu/tenkyu.component';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit, AfterViewChecked {
  public _subscribe$ = new Subject();
  public userOrders: any[] = [];
  public scrollUpDistance = 1.5;
  public scrollDistance = 2;
  public price: string = '';
  private array: any[] = [];
  public throttle = 300;
  public okSms = '';

  constructor(
    public frames: FramesServService,
    public modalService: NgbModal,
    public activRout: ActivatedRoute,
    public userOrderService: UserOrderService,
    private spinner: NgxSpinnerService,
    public _translate: TranslateService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.peyMessage();
    this.frames.offset = 0;
    this.userOrders;
    this.appendItems();
    // this.spinner.hide();
  }

  private peyMessage(): void {
    this.activRout.queryParams.subscribe(url => {
      if (url.status) {
        const modalRef = this.modalService.open(TenkyuComponent);
        modalRef.componentInstance.status = url.status;
      }
    })
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);

  }


  private appendItems(): void {
    this.spinner.show()
    this.userOrderService.userOrderGet()
      .pipe(takeUntil(this._subscribe$))
      .subscribe((orderResult: ServerResponce<OrderResult[]>) => {
        orderResult.results.forEach((item: any) => {
          item.order_items_details.forEach((obj: any) => {
            obj.isBlock = false;
            obj.isDisabled = false;
            obj.isPrev = false;
          })
          item.order_items_details[0].isBlock = true;
        })

        orderResult.results.reverse();
        this.userOrders.push(...orderResult.results);
        this.frames.offset += 10;
        this.frames.isMyOrder = true;
        this.spinner.hide();
      })
  }

  public showPrice(arr: any, num: number): string {
    this.price = arr.created_frame_details.price;
    return this.price
  }

  public onScrollDown(ev: any): void {
    if (this.userOrders.length < 10) {
      this.userOrders
    } else {
      this.appendItems();
    }
  }

  public deleteUsOrder(item: any): void {
    const modalRef = this.modalService.open(DeleteComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.userOrders = this.userOrders;
    modalRef.result.then((result) => {
      this.userOrders = result;
    });
  }

  public addOrder(index: number): void {
    this.spinner.show();
    let created_frame = '';
    this.userOrders[index].order_items_details.forEach((el: any) => {
      created_frame = el.created_frame

    })

    const obj = {
      created_frame: created_frame,
      user: this.frames.userData.user
    }

    this.frames.orderCard(obj).pipe(takeUntil(this._subscribe$)).subscribe((cardItem: CardItemResults) => {
      this.frames.orderList.push(cardItem);
      this.spinner.hide()

    })

  }

  public checkImage(img: string): boolean {
    return img.startsWith('http') ? true : false
  }

  public prevOrder(order: any, num: number): void {

    if (num <= (order.order_items_details.length - 1)) {
      order.order_items_details[num].isBlock = false
      order.order_items_details[num - 1].isBlock = true
      order.order_items_details[num - 1].isDisabled = false
    }

    if ((num - 1) == 0) {
      order.order_items_details[num - 1].isDisabled = false
      // order.order_items_details[num - 1].isPrev = false;
    }

  }


  public nextOrder(order: any, num: number): void {
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

  ngOnDestroy(): void {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}