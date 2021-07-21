import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserImagsComponent } from './user-imags.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.modult';


const routes:Routes = [
  {path:'',component:UserImagsComponent}
]


@NgModule({
  declarations: [
    UserImagsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserImagsModule { }
