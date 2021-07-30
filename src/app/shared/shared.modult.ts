import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NgxMaskModule } from "ngx-mask";
import { OrderComponent } from "../order/order/order.component";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
    declarations:[OrderComponent],
    exports:[OrderComponent,NzModalModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule ,
        NzButtonModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        NgxTrimDirectiveModule,
        NgxMaskModule],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule ,
        NzButtonModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        NgxTrimDirectiveModule,
        NzModalModule,
        NgxMaskModule.forRoot(),
    ]
})
export class SharedModule{}