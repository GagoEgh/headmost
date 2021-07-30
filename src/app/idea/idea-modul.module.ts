import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaComponent } from './idea/idea.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routs:Routes=[
  {path:'',component:IdeaComponent}
]

@NgModule({
  declarations: [
    IdeaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule.forChild(routs)
  ],
  exports:[RouterModule]
})
export class IdeaModulModule { }
