import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserOrderComponent } from './user-order.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';

const routes:Routes = [
  {path:'',component:UserOrderComponent}
]

@NgModule({
  declarations: [UserOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class UserOrderModule { }
