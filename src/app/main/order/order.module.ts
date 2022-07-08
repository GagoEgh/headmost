import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.modult';

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
