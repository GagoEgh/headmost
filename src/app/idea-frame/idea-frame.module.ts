import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgIdeaComponent } from './img-idea/img-idea.component';
import { SharedModule } from '../shared/shared.modult';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routs:Routes=[
  {path:'',component:ImgIdeaComponent}
]

@NgModule({
  declarations: [
    ImgIdeaComponent
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
export class IdeaFrameModule { }
