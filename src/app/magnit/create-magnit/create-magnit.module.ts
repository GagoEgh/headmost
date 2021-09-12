import { CreateMagnitComponent } from './create-magnit/create-magnit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


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
