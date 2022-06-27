import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { NgModule } from '@angular/core';

const routs:Routes =[
  {path:'',component:OrderComponent},

]

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routs),
    
  ],
  exports:[RouterModule],

})
export class OrderModule { }
