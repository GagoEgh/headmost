import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMagnitModule } from '../magnit/create-magnit/create-magnit.module';

const routs:Routes=[
  {path:'',component:AboutUsComponent}
]

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CreateMagnitModule,
    ReactiveFormsModule,
    RouterModule.forChild(routs),

  ],
  exports:[RouterModule],
})
export class AboutUsModule { }
