import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMagnitComponent } from './create-magnit/create-magnit.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.modult';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateMagnitComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    CreateMagnitComponent
  ]
})
export class CreateMagnitModule { }
