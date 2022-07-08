import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMagnitComponent } from './create-magnit/create-magnit.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.modult';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const rout:Routes=[{
  path:'',component: CreateMagnitComponent,
}]


@NgModule({
  declarations: [
    CreateMagnitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rout),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
   RouterModule
  ]
})
export class CreateMagnitModule { }