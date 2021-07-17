import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RegisterComponent } from "./register/register.component";
import { NzSelectModule } from "ng-zorro-antd/select";
import { SharedModule } from "../shared/shared.modult";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { NgxMaskModule } from "ngx-mask";

import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
@NgModule({
    declarations:[LoginComponent,RegisterComponent],
    imports:[
        NzDatePickerModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule ,
        NzButtonModule,
        NzInputModule,
        NzSelectModule,
        SharedModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,     
        NgxMaskModule.forRoot(),
        NgxTrimDirectiveModule
    ],
    exports:[RouterModule],
})
export class RegisterModule{}