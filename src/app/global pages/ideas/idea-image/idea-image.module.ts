import { IdeaImageComponent } from './idea-image/idea-image.component';
import { SharedModule } from 'src/app/shared/shared.modult';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const router: Routes = [
  {
    path: '', component: IdeaImageComponent,
  }]

@NgModule({
  declarations: [IdeaImageComponent],
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class IdeaImageModule { }

