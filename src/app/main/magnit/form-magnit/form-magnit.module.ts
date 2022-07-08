import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormMagnitComponent } from './form-magnit/form-magnit.component';


const rout:Routes=[{
  path:'',component:FormMagnitComponent
}]

@NgModule({
  declarations: [
    FormMagnitComponent
  ],
  imports: [
    RouterModule.forChild(rout),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[RouterModule]
})
export class FormMagnitModule { }
