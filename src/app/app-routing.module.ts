import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'frame' },
  { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
  { path: 'magnit', loadChildren: () => import('./magnit/magnit.module').then(m => m.MagnitModule) },
  { path: 'user', loadChildren: () => import('./user-data/user-data.module').then(m => m.UserDataModule) },
  { path: 'idea', loadChildren: () => import('./idea/idea-nav/idea-nav.module').then(m => m.IdeaNavModule) },
  { path: 'about', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'frame', loadChildren: () => import('./frame/frame.module').then(m => m.FrameModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }