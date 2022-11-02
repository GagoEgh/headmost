import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'frame' },

  { path: 'order', loadChildren: () => import('./main/order/order.module').then(m => m.OrderModule) },
  { path: 'magnit', loadChildren: () => import('./main/magnit/magnit.module').then(m => m.MagnitModule) },
  { path: 'user', loadChildren: () => import('./main/user-data/user-data.module').then(m => m.UserDataModule) },
  { path: 'idea', loadChildren: () => import('./global pages/ideas/idea-nav/idea-nav.module').then(m => m.IdeaNavModule) },
  { path: 'about', loadChildren: () => import('./global pages/we/about-us.module').then(m => m.AboutUsModule) },
  { path: 'frame', loadChildren: () => import('./main/frame/frame.module').then(m => m.FrameModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }