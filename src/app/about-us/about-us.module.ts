import { AboutUsComponent } from './about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routs: Routes = [
  { path: '', component: AboutUsComponent }
]

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routs),
  ],
  exports: [RouterModule],
})
export class AboutUsModule { }
