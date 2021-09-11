import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdModalContentComponent } from '../ngbd-modal-content/ngbd-modal-content.component';
import { FrameComponent } from './frame.component';
import { ErroreMessageComponent } from '../errore-message/errore-message/errore-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';
import { RouterModule, Routes } from '@angular/router';


const routs: Routes = [
  {path:'',component:FrameComponent}
]

@NgModule({
  declarations: [ FrameComponent,
    NgbdModalContentComponent,
    ErroreMessageComponent,],
  exports:[RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   // CreateImgModule,
    SharedModule,
    RouterModule.forChild(routs),
  ]
})
export class FrameImgModule { }
