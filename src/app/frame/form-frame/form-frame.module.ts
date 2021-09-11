import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFrameComponent } from './form-frame/form-frame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';
import { RouterModule, Routes } from '@angular/router';

const routs: Routes = [
  {path:'',component:FormFrameComponent}
]


@NgModule({
  declarations: [
    FormFrameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routs)
  ],
  exports:[
    RouterModule
  ]
})
export class FormFrameModule { }
