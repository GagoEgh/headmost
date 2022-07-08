
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.modult';
import { AboutUsComponent } from './about-us/about-us.component';

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
