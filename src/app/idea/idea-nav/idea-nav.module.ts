import { NgModule } from '@angular/core';
import { IdeaNavComponent } from './idea-nav/idea-nav.component';
import { SharedModule } from 'src/app/shared/shared.modult';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
 import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const router: Routes = [
  {
    path: '', component: IdeaNavComponent,
    children: [
     { path: '', redirectTo: 'idea-imags', pathMatch: 'full' },
     { path: 'idea-imags', loadChildren: ()=>import('../idea/idea-modul.module').then(m=>m.IdeaModulModule) },
      { path: 'idea-imags/:id', loadChildren: () => import('../idea-image/idea-image.module').then(m => m.IdeaImageModule) }
    ]
  }
]

@NgModule({
  declarations: [
    IdeaNavComponent,
  ],
  imports: [
    SharedModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class IdeaNavModule { }
