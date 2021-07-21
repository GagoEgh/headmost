import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'frame'},
  {path:'order',loadChildren:()=>import('./order/order.module').then(m=>m.OrderModule)},
  {path:'user',loadChildren:()=>import('./user-data/user-data.module').then(m=>m.UserDataModule)},
  {path:'frame',loadChildren:()=>import('./frame/frame.module').then(m=>m.FrameModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
