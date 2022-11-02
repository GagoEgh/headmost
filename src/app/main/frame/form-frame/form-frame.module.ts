import { FormFrameComponent } from './form-frame/form-frame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


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
