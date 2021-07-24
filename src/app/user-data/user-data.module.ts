import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult'
import { ProfilModule } from './user-data/profil-module';
import { UserGuard } from './userGuard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '', component:UserComponent,
    children: [
      { path: 'imags', loadChildren: () => import('./user-imags/user-imags.module').then(m => m.UserImagsModule), canActivate: [UserGuard] },
      { path: 'user-order', loadChildren: () => import('./user-order/user-order.module').then(m => m.UserOrderModule), canActivate: [UserGuard] },
      { path: 'profil', loadChildren: () => import('./user-data/profil-module').then(m => m.ProfilModule), canActivate: [UserGuard] },
    ]
  },

]

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],

})
export class UserDataModule { }
