import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.modult";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PasswordModule } from "../shared/components/password/password.module";

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [
        SharedModule,
        PasswordModule
    ],
 
    exports: [RouterModule],
})
export class RegisterModule { }