import { MessageComponent } from '../message/message.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../../shared/shared.modult';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeaComponent } from './idea.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
