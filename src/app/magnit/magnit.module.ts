import { CreateMagnitModule } from './create-magnit/create-magnit.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MagnitComponent } from './magnit/magnit.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.modult';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const rout:Routes=[{
  path:'',component:MagnitComponent,
  children:[
    {path:'',redirectTo:'form-magnit',pathMatch:'full'},
    {path:'create-magnit',loadChildren:()=>import('../magnit/create-magnit/create-magnit.module').then(m=>m.CreateMagnitModule)},
    {path:'form-magnit',loadChildren:()=>import('../magnit/form-magnit/form-magnit.module').then(m=>m.FormMagnitModule)}
  ]
}]


@NgModule({
  declarations: [
    MagnitComponent
  ],
  imports: [
    RouterModule.forChild(rout),
    CommonModule,
    SharedModule,
    FormsModule,
    CreateMagnitModule,
    ReactiveFormsModule,
  ],
  exports:[
    RouterModule
  ]
})
export class MagnitModule { }
