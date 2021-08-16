import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbdModalContentComponent } from './ngbd-modal-content/ngbd-modal-content.component';
import { CreateImgModule } from './create-img/create-img-module';
import { SharedModule } from '../shared/shared.modult';

const routs:Routes=[
  {path:'',component:FrameComponent}
]

@NgModule({
  declarations: [
    FrameComponent,
    NgbdModalContentComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateImgModule,
    SharedModule,
    RouterModule.forChild(routs),

  ],
  exports:[RouterModule]
})
export class FrameModule { }
