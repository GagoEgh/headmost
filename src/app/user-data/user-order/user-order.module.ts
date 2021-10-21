import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserOrderComponent } from './user-order.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgImageSliderModule } from 'ng-image-slider';

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
    InfiniteScrollModule,
    NgImageSliderModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  
})
export class UserOrderModule { }
