import { Component, OnInit } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  userOrders:any[] = [];

  constructor(public frames: FramesServService) { }
  date = ''
  ngOnInit(): void {
    this.frames.userOrderGet().subscribe((el: any) => {



      this.userOrders = el.results;
      this.userOrders.forEach((el: any) => {

        console.log(el.created_at);
      

      })
      console.log(this.userOrders);
      

    })
  }

}
