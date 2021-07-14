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

@NgModule({
    declarations:[OrderComponent],
    exports:[OrderComponent],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule ,
        NzButtonModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        NgxMaskModule.forRoot(),
    ]
})
export class SharedModule{}