import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NgxMaskModule } from "ngx-mask";
import { OrderComponent } from "../order/order/order.component";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MatSelectModule } from '@angular/material/select';

import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

const MatModule = [
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
]

const NzModule = [
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
]

const NgxModule = [
    NgxTrimDirectiveModule,
    NgxSpinnerModule,
]

const module = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
]

@NgModule({
    declarations: [OrderComponent],
    exports: [
        ...MatModule,
        ...NzModule,
        ...NgxModule,
        ...module,
        NgxMaskModule,
        OrderComponent,
    ],
    imports: [
        ...module,
        ...NzModule,
        ...MatModule,
        ...NgxModule,
        NgxMaskModule.forRoot(),
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
