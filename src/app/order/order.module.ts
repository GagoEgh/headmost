import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.modult';





const routs:Routes =[
  {path:'',component:OrderComponent},

]

@NgModule({
  declarations: [

  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routs)
  ],
  exports:[RouterModule],

})
export class OrderModule { }
