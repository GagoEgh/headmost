import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { IdeaComponent } from './idea.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.modult';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from '../message/message.component';


const routs:Routes=[
  {path:'',component:IdeaComponent}
]

@NgModule({
  declarations: [
    IdeaComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routs)
  ],
  exports:[RouterModule],
})
export class IdeaModulModule { }
