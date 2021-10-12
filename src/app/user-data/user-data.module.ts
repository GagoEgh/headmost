import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { UserComponent } from './user/user.component';
import { NgModule} from '@angular/core';
import { UserGuard } from './userGuard';
import { DataCheckComponent } from './data-check/data-check.component';
import { OkSmsComponent } from './ok-sms/ok-sms.component';
import { OnlyComponent } from './only/only.component';
import { DeleteComponent } from './delete/delete.component';
import { NoCheckComponent } from './no-check/no-check.component';

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
    UserComponent,
    DataCheckComponent,
    OkSmsComponent,
    OnlyComponent,
    DeleteComponent,
    NoCheckComponent
  ],
  imports: [
    InfiniteScrollModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule],

})
export class UserDataModule { }
