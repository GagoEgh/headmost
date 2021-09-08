import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbdModalContentComponent } from './ngbd-modal-content/ngbd-modal-content.component';
import { CreateImgModule } from './create-img/create-img-module';
import { SharedModule } from '../shared/shared.modult';
import { ErroreMessageComponent } from './errore-message/errore-message/errore-message.component';

const routs: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: 'create-img', loadChildren: () => import('../frame/create-img/create-img-module').then(m => m.CreateImgModule) },
    ]
  },
]

@NgModule({
  declarations: [
    FrameComponent,
    NgbdModalContentComponent,
    ErroreMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   // CreateImgModule,
    SharedModule,
    RouterModule.forChild(routs),

  ],
  exports: [RouterModule]
})
export class FrameModule { }
