import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImgCatalogComponent } from '../frame/create-img/img-catalog/img-catalog.component';
import { ErroreMessageComponent } from '../frame/errore-message/errore-message/errore-message.component';
import { FrameService } from '../frame/frame/frame.service';

import { NgbdModalContentComponent } from '../frame/ngbd-modal-content/ngbd-modal-content.component';
import { IdeaImageService } from '../idea/idea-image/idea-image.service';
import { CategoryDetails } from '../modeles/CategoryDetails.modele';
import { ServerResponce } from '../modeles/img-ramka.modele';
import { FramesServService } from '../shared/frames-serv.service';
import { FrameImageService } from './frame-image.service';

export class FrameImag {
  public _unsubscribe$ = new Subject();
  protected bottomText: FormGroup = new FormGroup({});
  protected validateForm: FormGroup = new FormGroup({});
  protected letterChar = 0;
  constructor(
    public frames: FramesServService,
    public modalService: NgbModal,
    public ideaImgService: IdeaImageService,
    public imgService: FrameImageService,
    public rout: Router,
    public form: FormBuilder,
    public frameService: FrameService,
    public activatedRoute: ActivatedRoute
  ) { }

  // frame component
  protected myForm(): void {
    this.frames.validateForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        this.textValid,
      ]),
    });
  }

  protected textValid(control: FormControl): object | null {
    const regExp = /[a-z A-Z]/;
    const simb = /[\!@#$%\^|\\&*()_\-+=}\[\]'";:\/?.>,<~`0-9]/;
    if (!regExp.test(control.value) || simb.test(control.value)) {
      return {
        noText: true,
      };
    }
    return null;
  }

  protected imgColor(): void {
    this.imgService
      .imgColorGet()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((categoryDetails: ServerResponce<CategoryDetails[]>) => {

        for (let i = 0; i < categoryDetails.count; i++) {
          if (
            this.frames &&
            this.frames.imgColor[i] &&
            this.frames.imgColor[i].ceys
          ) {
            this.frames.imgColor[i].ceys = categoryDetails.results[i];
          }
        }
      });
  }

  public imgFone(obj: any): void {
    this.imgService.painding.values = obj.values;
    this.imgService.painding.id = obj.ceys.id;
    this.activatedRoute.queryParams
      .subscribe({
        next: (rout: any) => {
          if (rout.text) {
            this.imgService.letterColorFone();
          }
        }
      })

  }

  public open(): void {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
  }

  public onSubmit(): void {
    if (this.frames.validateForm.invalid) {
      const modalRef = this.modalService.open(ErroreMessageComponent);
      setTimeout(() => {
        modalRef.dismiss();
      }, 2500);
      return;
    }
    this.frames.isImg = false;
    this.imgService.letterColorFone();

    this.imgService.setLettersQuantity(
      this.frames.validateForm.get('text')?.value.length
    );

    this.imgService.setFramePrice(this.frames.frame.price);
  }

  public showFrame(): void {

    this.frames.showFrame();
    this.frames.conteinerHeight();
    this.ideaImgService.isIdeaFrame = false;
    this.rout.navigate(['']);
    this.imgService.clearPrice()
  }

  // poxel
  public changeImg(): void {
    this.imgService.letterColorFone();
  }

  public openImg(img: any, num: number): void {

    this.frames
      .letterColection(img.character.toUpperCase())
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((el: any) => {
        const modalRef = this.modalService.open(ImgCatalogComponent, {
          size: 'lg',
        });
        modalRef.componentInstance.img = el.results;
        modalRef.componentInstance.character = this.frames.letterImges[num];
        modalRef.result.then(
          (result) => { },
          (reason) => {
            if (reason) {
              if (!this.frames.apiPhoto) {
                reason.thumbnail = reason.thumb_image;
                this.letterChar = this.frames.letterImges[num].image.character;
              }

              this.frames.letterImges[num].image = reason;
            }
          }
        );
      });
  }

  public checkImage(img: string): boolean {
    if (img) {
      return img.startsWith('http') ? true : false;
    }
    return false;
  }
}
