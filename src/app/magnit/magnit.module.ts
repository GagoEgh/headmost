import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagnitComponent } from './magnit/magnit.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMagnitModule } from './create-magnit/create-magnit.module';

const rout:Routes=[{
  path:'',component:MagnitComponent
}]

@NgModule({
  declarations: [
    MagnitComponent
  ],
  imports: [
    RouterModule.forChild(rout),
    CommonModule,
    SharedModule,
    FormsModule,
    CreateMagnitModule,
    ReactiveFormsModule,
  ],
  exports:[
    RouterModule
  ]
})
export class MagnitModule { }
