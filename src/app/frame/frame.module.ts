import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameComponent } from './frame/frame.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoUsserComponent } from './create-img/no-usser/no-usser.component';

const routs: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: '', redirectTo: 'form-frame', pathMatch: 'full' },
      { path: 'create-img', loadChildren: () => import('../frame/create-img/create-img-module').then(m => m.CreateImgModule) },
      { path:'frame-img',loadChildren:() => import('../frame/frame/frame-img.module').then(m=>m.FrameImgModule)},
      { path:'form-frame',loadChildren:()=>import('../frame/form-frame/form-frame.module').then(m=>m.FormFrameModule)}
    ]
  },
]

@NgModule({
  declarations: [
    NoUsserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routs),
    
  ],
  exports: [RouterModule]
})
export class FrameModule { }
