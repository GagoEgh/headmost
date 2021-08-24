import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FramesServService } from '../../shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { FrameImag } from 'src/app/shared/frame-image';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FramesImg } from '../../shared/img-ramka';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent extends FrameImag implements OnInit {

  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  heigth: number | undefined;
  width: number | undefined;

  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder, private _translate: TranslateService) {
    super(frames, modalService, rout, form);
    this._translate.use(this.frames.lang)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.heigth = this.block?.nativeElement.clientHeight | 1;
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.frames.scale = window.innerWidth / this.width - 0.34;
      // if (window.innerWidth <= 768) {
      //   this.frames.scale = 0.8;
      //   this.frames.scale = window.innerWidth / this.width;
      // }
      if(window.innerWidth <= 425){
        this.frames.scale = 0.47
      }

      if(window.innerWidth <= 375){
        this.frames.scale = 0.4
      }

      if(window.innerWidth <= 320){
        this.frames.scale = 0.37
      }
    }

    if (this.frames.letterImges.length <= 4 && this.frames.letterImges.length) {
      if (window.innerWidth <= 1165) {
        this.width += 280;
        this.frames.scale = window.innerWidth / this.width - 0.2;
        // if (window.innerWidth <= 768) {
        //   this.frames.scale = 0.75;
        //   this.frames.scale = window.innerWidth / this.width-0.05;
        // }
        if(window.innerWidth <= 425){
          this.frames.scale = 0.47
        }

        if(window.innerWidth <= 375){
          this.frames.scale = 0.4
        }

        if(window.innerWidth <= 320){
          this.frames.scale = 0.37
        }
      }
    }

    if (this.frames.letterImges.length <= 2 && this.frames.letterImges.length) {
      if (window.innerWidth <= 1165) {
        this.width += 380;
        this.frames.scale = window.innerWidth / this.width;
        // if (window.innerWidth <= 768) {
        //   this.frames.scale = 0.75;
        //   this.frames.scale = window.innerWidth / this.width -0.05;
        // }

        if(window.innerWidth <= 425){
          this.frames.scale = 0.47
        }

        if(window.innerWidth <= 375){
          this.frames.scale = 0.4
        }

        if(window.innerWidth <= 320){
          this.frames.scale = 0.37
        }
      }
    }
  

  }


  ngOnInit(): void {
    this.frames.letterImges = [];
    this.frames.isOrder = false;
    super.myForm();
    super.imgColor();

   
    this._translate.get('_img-text-valid').pipe(takeUntil(this._unsubscribe$))
      .subscribe((res: any) => {
        this.frames.placeholder = res["_placeholder"];
      })

    this.frames.framesFoneGet().pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
      this.frames.div = el.results;
      this.frames.background = el.results[0];

    })

    this.frames.getFrames().pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
      this.frames.framesImge = el.results;
      this.frameClick(this.frames.index);
    })

  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, 0)" + "scale(" + this.frames.scale + ")"
    }
    return style
  }

  public setTransform() {
    let style = {
      transform: "translate(-50%, -5%)" + "scaleY(" + this.frames.scale + ")",
    }
    return style
  }

  frameClick(id: number) {
    this.frames.index = id;
    this.frames.frame = this.frames.framesImge.find(item => item.id === this.frames.index);
  }

  getFrameId(img: FramesImg) {
    return img.id === this.frames.index
  }

  changeBg(bg: any) {
    this.frames.background = bg;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
