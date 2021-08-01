import { Component, OnInit } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  userOrders: any[] = [];
  array: any[] = [];
  throttle = 300;
  scrollDistance = 3;
  scrollUpDistance = 1;

  constructor(public frames: FramesServService, private spinner:NgxSpinnerService) { }

  appendItems() {
    this.spinner.show()
    this.frames.userOrderGet().subscribe((el: any) => {
      this.userOrders.push(...el.results)
      this.frames.offset += 10;
      setTimeout(() => {
        this.frames.isMyOrder = true;
        this.spinner.hide()
      })
   
    })
  }

  onScrollDown(ev: any) {
    this.appendItems();
  }

  ngOnInit(): void {
    this.frames.offset = 0;
    this.appendItems();

  }

  addOrder(index:number) {
    this.spinner.show()
    let created_frame ='';
    this.userOrders[index].order_items_details.forEach((el:any)=>{
      created_frame = el.created_frame
    })

    const obj ={
      created_frame:created_frame,
      user:this.frames.userData.user
     }
     
     this.frames.orderCard(obj).subscribe((el:any)=>{
      this.frames.orderList.push(el);
      this.spinner.hide()
     })


  }
}
