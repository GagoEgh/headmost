import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './email.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatFormFieldModule,
    TranslateModule,

  ],
  exports:[EmailComponent]
})
export class EmailModule { }
