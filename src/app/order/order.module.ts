import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxMaskModule } from 'ngx-mask'
import { NzSelectModule } from 'ng-zorro-antd/select';




const routs:Routes =[
  {path:'',component:OrderComponent}
]

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule ,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,

    NgxMaskModule.forRoot(),
    RouterModule.forChild(routs)
  ],
  exports:[RouterModule],

})
export class OrderModule { }
