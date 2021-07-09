import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbdModalContentComponent } from './ngbd-modal-content/ngbd-modal-content.component';
import { CreateImgComponent } from './create-img/create-img/create-img.component';
import { ImgCatalogComponent } from './create-img/create-img/img-catalog/img-catalog.component';



const routs:Routes=[
  {path:'',component:FrameComponent}
]

@NgModule({
  declarations: [
    FrameComponent,
    NgbdModalContentComponent,
    CreateImgComponent,
    ImgCatalogComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routs)
  ],
  exports:[RouterModule]
})
export class FrameModule { }
