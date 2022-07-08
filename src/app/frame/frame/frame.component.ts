import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FramesServService } from '../../shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FramesImg } from 'src/app/modeles/ImageResponse.modele';
import { BgDetails } from 'src/app/modeles/CategoryDetails.modele';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';
import { FrameService } from './frame.service';
import { IdeaImageService } from 'src/app/idea/idea-image/idea-image.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent
  extends FrameImag
  implements OnInit, AfterViewChecked, AfterContentChecked {
  @ViewChild('block', { static: false }) block: ElementRef | undefined;
  private width: number | undefined;
  public catalogStyle = {} as { [key: string]: string };
  public scale: number = 1;
  public div: any = [];
  public productPrice?: number = 0;
  public backgroundClass: string = 'bg4';
  public bgClassArr: string[] = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'];

  constructor(
    public frames: FramesServService,
    public modalService: NgbModal,
    public frameServis: FrameService,
    public imgService: FrameImageService,
    public ideaImgService: IdeaImageService,
    public rout: Router,
    public form: FormBuilder,
    private _translate: TranslateService,
    private _frameImgService: FrameImageService,
    public activatedRoute: ActivatedRoute
  ) {
    super(
      frames,
      modalService,
      ideaImgService,
      imgService,
      rout,
      form,
      frameServis,
      activatedRoute
    );
    this._translate.use(this.frames.lang);
  }

  ngAfterViewChecked(): void {
    this.onResize();
  }

  ngOnInit(): void {
    super.myForm();
    super.imgColor();


    this.frames.isOrder = false;
    const text = this.activatedRoute.snapshot?.queryParams?.text;
    const frameId = +this.activatedRoute.snapshot?.queryParams?.frameId;
    const backgroundId = +this.activatedRoute.snapshot?.queryParams?.background;

    if (!!text) {
      this.imgService.letterColorFone(text, frameId, backgroundId);
      this.imgService.setLettersQuantity(text?.length);
     
    } else {
      if (this.frames.isImg) {
        if (!frameId && !backgroundId)
          this.rout.navigate(['frame/form-frame']);
        this.frames.letterImges = [];
      }
    }

    this.allResponse(frameId, backgroundId)

    setTimeout(() => {
      this.onResize();
    });
  }

  allResponse(frameId: number, backgroundId: number) {
    forkJoin({
      translate: this._translate.get('ImgTextValid'),
      fone: this.frameServis.framesFoneGet(),
      frames: this.frameServis.getFrames()
    })
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (res) => {
          this.frames.placeholder = res.translate['placeholder'];
          this.frameServis.framesImge = res.frames.results;
          this.frames.div = res.fone.results;
          this.div = this.frames.div;

          if (backgroundId) {
            this.frames.background.id = backgroundId!;
          } else {
            this.frames.background = res.fone.results[0];
          }
          this.frames.background = this.div.find((item: any) => {
            return item.id === this.frames.background.id
          })
      
          if (frameId) {
            this.frames.index = frameId
          }

          this.frames.frame = this.frameServis.framesImge.find(
            (item) => item.id === this.frames.index
          );

          this.frameClick(this.frames.index);
        }
      })
  }

  ngAfterContentChecked(): void {
    this.productPrice = this._frameImgService.getPrice();
  }

  public backgroundImageChangeRight(): any {
    for (let i = 0; i <= this.bgClassArr.length - 1; i++) {
      if (this.backgroundClass == this.bgClassArr[i]) {
        if (i == this.bgClassArr.length - 1) {
          return this.backgroundClass = this.bgClassArr[0]
        }
        return this.backgroundClass = this.bgClassArr[i + 1]
      }
    }
  }

  public backgroundImageChangeLeft(): any {
    for (let i = this.bgClassArr.length - 1; i >= 0; i--) {
      if (this.backgroundClass == this.bgClassArr[i]) {
        if (i == 0) {
          return this.backgroundClass = this.bgClassArr[this.bgClassArr.length - 1]
        }
        return this.backgroundClass = this.bgClassArr[i - 1]
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.scale = window.innerWidth / this.width - 0.35;
    }

    if (this.frames?.letterImges?.length) {
      this.scale = 1;
      if (window.innerWidth <= 1290) {
        this.scale = window.innerWidth / 1180;
      }
    }
    this.frames.conteinerHeight();
    this.setStyle();
  }

  private setStyle(): void {
    let style = {
      transform: 'translate(0, 0)' + 'scale(' + this.scale + ')',
    };
    this.catalogStyle = style;
  }

  public frameClick(id: number): void {
    this.frames.index = id;


    this.frames.frame = this.frameServis.framesImge.find(
      (item) => item.id === this.frames.index
    );
      this.rout.navigate([], {
        queryParams: {
          frameId: this.frames.index,
          // background: this.frames.background.id
        },
        queryParamsHandling: 'merge',
      })
    

    this._frameImgService.setFramePrice(this.frames?.frame?.price);

  }

  //FramesImg
  public getFrameId(img: FramesImg): boolean {
    return img.id === this.frames.index;
  }

  public changeBg(bg: BgDetails): void {
    this.frames.background = bg;
    this.rout.navigate([], {
      queryParams: {
        background: this.frames.background.id
      },
      queryParamsHandling: 'merge'
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
