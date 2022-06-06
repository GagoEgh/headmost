import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
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
import { Router } from '@angular/router';
import { ServerResponce } from 'src/app/modules/img-ramka.module';
import { FramesImg } from 'src/app/modules/ImageResponse.module';
import { BgDetails } from 'src/app/modules/CategoryDetails.module';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';
import { FrameService } from './frame.service';
import { IdeaImageService } from 'src/app/idea/idea-image/idea-image.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent
  extends FrameImag
  implements OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked
{
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
    private _frameImgService: FrameImageService
  ) {
    super(
      frames,
      modalService,
      ideaImgService,
      imgService,
      rout,
      form,
      frameServis
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
    
    if (this.frames.isImg) {
      this.rout.navigate(['frame/form-frame']);
      this.frames.letterImges = [];
    }

    this.imgTextGet();

    this.frameBg();

    this.framesImgGet();
    setTimeout(() => {
      this.onResize();
    });
  }

  ngAfterViewInit(): void {
    this.productPrice = this._frameImgService.getPrice();
  }

  ngAfterContentChecked(): void {
    this.productPrice = this._frameImgService.getPrice();
  }

  public backgroundImageChangeRight(): any {
    for(let i = 0; i <= this.bgClassArr.length - 1; i++){
      if(this.backgroundClass == this.bgClassArr[i]){
        if(i == this.bgClassArr.length-1){
          return this.backgroundClass = this.bgClassArr[0]
        }
        return this.backgroundClass = this.bgClassArr[i + 1]
      }
    }
  }

  public backgroundImageChangeLeft(): any {
    for(let i = this.bgClassArr.length - 1; i >= 0; i--){
      if(this.backgroundClass == this.bgClassArr[i]){
        if(i == 0){
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

    if (this.frames.letterImges.length) {
      this.scale = 1;
      if (window.innerWidth <= 1290) {
        this.scale = window.innerWidth / 1180;
      }
    }
    this.frames.conteinerHeight();
    this.setStyle();
  }

  private framesImgGet(): void {
    this.frameServis
      .getFrames()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((framesImg: ServerResponce<FramesImg[]>) => {
        this.frameServis.framesImge = framesImg.results;
        this.frameClick(this.frames.index);
      });
  }

  private imgTextGet(): void {
    this._translate
      .get('ImgTextValid')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((frameText: { [key: string]: string }) => {
        this.frames.placeholder = frameText['placeholder'];
      });
  }

  private frameBg(): void {
    this.frameServis
      .framesFoneGet()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((bgDetails: ServerResponce<BgDetails[]>) => {
        this.div = bgDetails.results;
        this.frames.background = bgDetails.results[0];
      });
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
    this._frameImgService.setFramePrice(this.frames.frame.price);
  }

  //FramesImg
  public getFrameId(img: FramesImg): boolean {
    return img.id === this.frames.index;
  }

  public changeBg(bg: BgDetails): void {
    this.frames.background = bg;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
