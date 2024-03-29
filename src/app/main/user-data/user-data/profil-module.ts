import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.modult";
import { UserDataComponent } from "./user-data.component";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule } from "ngx-mask";
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ChangeEmailComponent } from "./components/change-email/change-email.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordModule } from "src/app/shared/components/password/password.module";
import { EmailModule } from "src/app/shared/components/email/email.module";


const routes: Routes = [
    { path: '', component: UserDataComponent }
]

@NgModule({
    declarations: [
        UserDataComponent,
        ChangeEmailComponent,
        ChangePasswordComponent
    ],
    imports: [
        EmailModule,
        PasswordModule,
        FontAwesomeModule,
        NzDatePickerModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzSelectModule,
        SharedModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        NgxMaskModule.forRoot(),
        NgxTrimDirectiveModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProfilModule {


}