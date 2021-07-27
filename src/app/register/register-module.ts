import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from "../shared/shared.modult";



@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [
        SharedModule,
    ],
    exports: [RouterModule],
})
export class RegisterModule { }