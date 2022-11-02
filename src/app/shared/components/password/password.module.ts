import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatFormFieldModule,
    FontAwesomeModule,
    TranslateModule,
  ],
  exports: [PasswordComponent]
})
export class PasswordModule { }
