import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { NgModule } from '@angular/core';
import { OkoderComponent } from './okoder/okoder.component';

const routs:Routes =[
  {path:'',component:OrderComponent},

]

@NgModule({
  declarations: [
    OkoderComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routs),

  ],
  exports:[RouterModule],

})
export class OrderModule { }
