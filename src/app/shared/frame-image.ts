
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ImgCatalogComponent } from "../frame/create-img/img-catalog/img-catalog.component";
import { ErroreMessageComponent } from "../frame/errore-message/errore-message/errore-message.component";
import { NgbdModalContentComponent } from "../frame/ngbd-modal-content/ngbd-modal-content.component";
import { FramesServService } from "./frames-serv.service";


export class FrameImag {
    public _unsubscribe$ = new Subject();
    bottomText: FormGroup = new FormGroup({});
    validateForm: FormGroup = new FormGroup({});
    letterChar = 0;
    constructor(public frames: FramesServService, public modalService: NgbModal,
        public rout: Router, public form: FormBuilder,
    ) {

    }

    // frame component
    myForm() {
        this.frames.validateForm = new FormGroup({
            text: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(9)])
        })
    }

    imgColor() {
        this.frames.imgColorGet().pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
            for (let i = 0; i < el.count; i++) {
                if (this.frames && this.frames.imgColor[i] && this.frames.imgColor[i].ceys) {
                    this.frames.imgColor[i].ceys = el.results[i];
                }
            }
        })
    }

    imgFone(obj: any) {
  
        this.frames.painding.values = obj.values;
        this.frames.painding.id = obj.ceys.id;
       
        if ( this.frames.validateForm.value.text !== null) {
          this.frames.letterColorFone();
        }

    }

    open() {
        const modalRef = this.modalService.open(NgbdModalContentComponent);
    }

    onSubmit() {
        if (this.frames.validateForm.invalid) {
            const modalRef = this.modalService.open(ErroreMessageComponent);
            setTimeout(() => {
                modalRef.dismiss();
            }, 1500)
            return;
        }
        this.frames.isImg = false;
       
        this.frames.letterColorFone();

    }

    deletImg(ev: boolean) {
        this.frames.isImg = ev;
        this.frames.validateForm.reset();
    }

    showFrame() {
        this.frames.showFrame()
    }

    // create-img component

    // getApp(isBool: boolean, mainApp: any) {
    //     mainApp.emit(isBool);
    //     this.frames.isOrder = false;
    // }


    changeImg() {
        this.frames.letterColorFone()
    }

    openImg(img: any, num: number) {
        this.frames.letterColection(img.character.toUpperCase()).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
            const modalRef = this.modalService.open(ImgCatalogComponent, { size: 'lg' });
            modalRef.componentInstance.img = el.results;
            modalRef.componentInstance.character = this.frames.letterImges[num];

            modalRef.result.then((result) => { }, (reason) => {
                if (reason) {
                    if (!this.frames.apiPhoto) {
                        this.letterChar = this.frames.letterImges[num].image.character;
                    }

                    this.frames.letterImges[num].image = reason;

                }
            })

        })

    }

    checkImage(img: string): boolean {
        return img.startsWith('http') ? true : false
    }

}