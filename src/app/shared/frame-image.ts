
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ImgCatalogComponent } from "../frame/create-img/img-catalog/img-catalog.component";
import { ErroreMessageComponent } from "../frame/errore-message/errore-message/errore-message.component";
import { NgbdModalContentComponent } from "../frame/ngbd-modal-content/ngbd-modal-content.component";
import { CategoryDetails } from "../interface/CategoryDetails";
import { ImageResponse } from "../interface/ImageResponse";
import { ServerResponce } from "../interface/img-ramka";
import { FramesServService } from "./frames-serv.service";



export class FrameImag {
    public _unsubscribe$ = new Subject();
    protected bottomText: FormGroup = new FormGroup({});
    protected validateForm: FormGroup = new FormGroup({});
    protected letterChar = 0;
    constructor(public frames: FramesServService, public modalService: NgbModal,
        public rout: Router, public form: FormBuilder,
    ) { }

    // frame component
    protected myForm(): void {
        this.frames.validateForm = new FormGroup({
            text: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(9), this.textValid])
        })
    }


    protected textValid(control: FormControl): object | null {
        const regExp = /[a-z A-Z]/;
        const simb = /[\!@#$%\^|\\&*()_\-+=}\[\]'";:\/?.>,<~`]/;
        if (!regExp.test(control.value) || simb.test(control.value)) {
            return {
                noText: true
            }
        }
        return null
    }

    protected imgColor(): void {
        this.frames.imgColorGet().pipe(takeUntil(this._unsubscribe$)).subscribe((categoryDetails: ServerResponce<CategoryDetails[]>) => {
            for (let i = 0; i < categoryDetails.count; i++) {
                if (this.frames && this.frames.imgColor[i] && this.frames.imgColor[i].ceys) {
                    this.frames.imgColor[i].ceys = categoryDetails.results[i];
                }
            }
        })
    }

    public imgFone(obj: any): void {

        this.frames.painding.values = obj.values;
        this.frames.painding.id = obj.ceys.id;

        if (this.frames.validateForm.value.text !== null) {
            this.frames.letterColorFone();
        }

    }

    public open(): void {
        const modalRef = this.modalService.open(NgbdModalContentComponent);
    }

    public onSubmit(): void {
        if (this.frames.validateForm.invalid) {
            const modalRef = this.modalService.open(ErroreMessageComponent);
            setTimeout(() => {
                modalRef.dismiss();
            }, 2500)
            return;
        }
        this.frames.isImg = false;
        this.frames.letterColorFone();
    }

    public showFrame(): void {

        this.frames.showFrame();
        this.frames.conteinerHeight();
    }


    public changeImg(): void {
        this.frames.letterColorFone()
    }

    public openImg(img: any, num: number): void {
        this.frames.letterColection(img.character.toUpperCase()).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
            const modalRef = this.modalService.open(ImgCatalogComponent, { size: 'lg' });
            modalRef.componentInstance.img = el.results;
            modalRef.componentInstance.character = this.frames.letterImges[num];

            modalRef.result.then((result) => { }, (reason) => {
                if (reason) {
                    if (!this.frames.apiPhoto) {
                        reason.thumbnail = reason.thumb_image
                        this.letterChar = this.frames.letterImges[num].image.character;
                    }

                    this.frames.letterImges[num].image = reason;

                }
            })

        })

    }
    public checkImage(img: string): boolean {
        if (img) {
            return img.startsWith('http') ? true : false
        }
        return false
    }

}