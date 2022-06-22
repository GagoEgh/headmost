//MatModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";

//NzModule 
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzModalModule } from 'ng-zorro-antd/modal';

//NgxModule
import { NgxMaskModule } from "ngx-mask";
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxSpinnerModule } from "ngx-spinner";

//Module
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderComponent } from "../order/order/order.component";
import { TranslateModule } from '@ngx-translate/core';
import { MyimagesComponent } from "./myimages/myimages.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { DialogContentComponent } from "./components/modal/modal.component";

const MatModule = [
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule
]

const NzModule = [
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzMessageModule,
    NzImageModule
]

const NgxModule = [
    NgxTrimDirectiveModule,
    NgxSpinnerModule,
]

const Module = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InfiniteScrollModule
]

@NgModule({
    declarations:
        [OrderComponent,
            MyimagesComponent,
            DialogContentComponent,
        ],
    exports: [
        ...MatModule,
        ...NzModule,
        ...NgxModule,
        ...Module,
        NgxMaskModule,
        OrderComponent,
        MyimagesComponent,
    ],
    imports: [
        ...Module,
        ...NzModule,
        ...MatModule,
        ...NgxModule,
        NgxMaskModule.forRoot(),
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
