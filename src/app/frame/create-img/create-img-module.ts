import { ImgCatalogComponent } from "./img-catalog/img-catalog.component";
import { CreateImgComponent } from "./create-img/create-img.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.modult";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";



const routs: Routes = [
    { path: '', component: CreateImgComponent },
]

@NgModule({
    declarations: [CreateImgComponent,
        ImgCatalogComponent],
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routs),
        
    ],
    exports: [
        CreateImgComponent,
        ImgCatalogComponent,
        RouterModule
    ],
})
export class CreateImgModule { }