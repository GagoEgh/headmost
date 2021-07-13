import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.modult";


import { CreateImgComponent } from "./create-img/create-img.component";
import { ImgCatalogComponent } from "./img-catalog/img-catalog.component";

   
@NgModule({
    declarations:[CreateImgComponent,ImgCatalogComponent],
    imports:[CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ],
    exports:[CreateImgComponent,ImgCatalogComponent]
})
export class CreateImgModule{}