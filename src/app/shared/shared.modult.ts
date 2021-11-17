import { CommonModule } from "@angular/common";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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
import { MatNativeDateModule} from '@angular/material/core';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {MatSelectModule} from '@angular/material/select';

import { NgxSpinnerModule } from "ngx-spinner";
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations:[OrderComponent],
    exports:[OrderComponent,NzModalModule,
        MatButtonModule,
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
        MatFormFieldModule,
        NgxMaskModule,
        NgxSpinnerModule,
        TranslateModule,
        MatSelectModule
    ],
    imports:[
        MatButtonModule,
        TranslateModule,
        MatSelectModule,
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
        MatFormFieldModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(),
    ],
  
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    
})
export class SharedModule{}
