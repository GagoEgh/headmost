import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FramesServService } from '../../shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { FrameImag } from 'src/app/shared/frame-image';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { FramesImg } from 'src/app/interface/ImageResponse';
import { BgDetails } from 'src/app/interface/CategoryDetails';



@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent extends FrameImag implements OnInit, AfterViewChecked {

  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  private width: number | undefined;
  public catalogStyle = {} as { [key: string]: string };

  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder, private _translate: TranslateService) {
    super(frames, modalService, rout, form);
    this._translate.use(this.frames.lang)
  }

  ngAfterViewChecked(): void {
    this.onResize();
  }

  ngOnInit(): void {
    super.myForm();
    super.imgColor();
    this.frames.letterImges = [];
    this.frames.isOrder = false;
    this.rout.navigate(['frame/form-frame']);
    this.imgTextGet();
    this.frameBg();
    this.framesImgGet();
    setTimeout(() => {
      this.onResize()
    })

  }


  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.frames.scale = window.innerWidth / this.width - 0.35;
    }

    if (this.frames.letterImges.length) {
      this.frames.scale = 1;
      if (window.innerWidth <= 1290) {
        this.frames.scale = window.innerWidth / 1180;
      }
    }
    this.frames.conteinerHeight();
    this.setStyle();
  }

  private framesImgGet(): void {
    this.frames.getFrames().pipe(takeUntil(this._unsubscribe$)).subscribe((framesImg: ServerResponce<FramesImg[]>) => {
      this.frames.framesImge = framesImg.results;
      this.frameClick(this.frames.index);
    })
  }

  private imgTextGet(): void {
    this._translate.get('ImgTextValid').pipe(takeUntil(this._unsubscribe$))
      .subscribe((frameText: { [key: string]: string }) => {
        this.frames.placeholder = frameText["placeholder"];
      })
  }

  private frameBg(): void {
    this.frames.framesFoneGet().pipe(takeUntil(this._unsubscribe$)).subscribe((bgDetails: ServerResponce<BgDetails[]>) => {
      this.frames.div = bgDetails.results;
      this.frames.background = bgDetails.results[0];
    })
  }

  private setStyle(): void {
    let style = {
      transform: "translate(-50%, 0)" + "scale(" + this.frames.scale + ")"
    }
    this.catalogStyle = style
  }

  public frameClick(id: number): void {
    this.frames.index = id;
    this.frames.frame = this.frames.framesImge.find(item => item.id === this.frames.index);
  }

  //FramesImg
  public getFrameId(img: FramesImg): boolean {
    return img.id === this.frames.index
  }

  public changeBg(bg: BgDetails): void {
    this.frames.background = bg;
  }

  private ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
