import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';



@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  userOrders: any[] = [];

  array: any[] = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 3;
  scrollUpDistance = 1;
  direction = "";


  count: number = 0;

  constructor(public frames: FramesServService) { }



  appendItems() {

    this.frames.userOrderGet().subscribe((el: any) => {
      this.userOrders.push(...el.results)
      this.frames.offset += 10;
      this.frames.isMyOrder = true;

      this.count = el.count;
      // this.userOrders.forEach((el: any) => {
      //   console.log(el.created_at);
      // })



      console.log(this.userOrders, '' + this.count);

    })
  }



  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);

    this.appendItems();

  }


  ngOnInit(): void {
    this.frames.offset = 0;
    this.appendItems();


  }



}
