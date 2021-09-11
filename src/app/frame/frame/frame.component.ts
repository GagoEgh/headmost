import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
export class FrameComponent extends FrameImag implements OnInit, AfterViewChecked {

  @ViewChild("block", { static: false }) block: ElementRef | undefined;

  width: number | undefined;

  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder, private _translate: TranslateService) {
    super(frames, modalService, rout, form);
    this._translate.use(this.frames.lang)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.frames.scale = window.innerWidth / this.width - 0.34;

      if (window.innerWidth <= 768) {
        this.frames.scale = 0.7
        this.frames.scale = window.innerWidth / this.width - 0.19;

      }

      if (window.innerWidth <= 425) {
        this.frames.scale = 0.47;
        this.frames.scale = window.innerWidth / this.width - 0.04;
      }

      if (window.innerWidth <= 375) {
        this.frames.scale = 0.4;
        this.frames.scale = window.innerWidth / this.width - 0.04;
      }

      if (window.innerWidth <= 320) {
        this.frames.scale = 0.37;
        this.frames.scale = window.innerWidth / this.width - 0.04;
      }

    }

    if (this.frames.letterImges.length <= 4 && this.frames.letterImges.length) {

      this.width = this.block?.nativeElement.clientWidth | 1;
      if (window.innerWidth <= 2102) {
        this.frames.scale = 0.9;
      }

      if (window.innerWidth <= 1536) {
        this.frames.scale = 0.9;
        let num = window.innerWidth / 1536;
        this.frames.scale = num - 0.1;
      }

      if (window.innerWidth <= 816) {
        this.frames.scale = 0.6;
        this.frames.scale = window.innerWidth / this.width - 0.9;
      }

      if (window.innerWidth <= 1025 && this.frames.letterImges.length <= 4) {
        this.frames.scale = 0.6;
      }

      if (window.innerWidth <= 768 && this.frames.letterImges.length <= 4) {
        this.frames.scale = 0.6;
      }

      if (window.innerWidth <= 426 && (this.frames.letterImges.length <= 4 && this.frames.letterImges.length > 0)) {
        this.frames.scale = 0.4;
      }

      if (window.innerWidth <= 320 && (this.frames.letterImges.length <= 4 && this.frames.letterImges.length > 0)) {
        this.frames.scale = 0.3;
      }
 
    }

    if (this.frames.letterImges.length > 4 && this.frames.letterImges.length) {

      this.frames.scale = 0.9;
      if (window.innerWidth <= 2006 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
        this.frames.scale = 0.8;
      }

      if (window.innerWidth <= 1063 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
        this.frames.scale = 0.8;
      }

      if (window.innerWidth <= 768 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
        this.frames.scale = 0.6;

      }

      if (window.innerWidth <= 426 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
        this.frames.scale = 0.35;
      
      }

      if (window.innerWidth <= 419 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
        this.frames.scale = 0.3;
      }
    }

  }

  conteinerHeight() {
    let height = {
      height: '538px'
    }

    if (this.frames.isOrder && window.innerWidth <= 426) {
      height.height = '570px';
      return height;
    }

    if (window.innerWidth <= 426) {
      height.height = '400px';
      return height;
    }

    if (window.innerWidth <= 375) {
      height.height = '400px';
      return height;
    }

    if (window.innerWidth <= 320) {
      height.height = '400px';
      return height;

    }

    if (window.innerWidth <= 816 && this.frames.letterImges.length === 4) {
      height.height = '400px';
      return height;
    }

    if (window.innerWidth <= 816 && this.frames.letterImges.length === 3) {
      height.height = '400px';
      return height;
    }

    if (window.innerWidth <= 656 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length < 7)) {
      height.height = '400px';
      return height;
    }


    if (this.frames.isOrder && window.innerWidth <= 768 && (this.frames.letterImges.length > 0 && this.frames.letterImges.length <= 9)) {
      height.height = '600px';
      return height;
    }


    // if (window.innerWidth <= 768 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
    //   height.height = '438px';
    //   return height;

    // }

   

    if (this.frames.isOrder && window.innerWidth <= 1657) {
      height.height = '1100px';
      return height;
    }
    // if (window.innerWidth <= 717 && this.frames.letterImges.length === 7) {
    //   height.height = '400px';
    //   return height;

    // }

    return height
  }

  // buttonWrapTop() {
  //   let top = {
  //     "margin-top": '70px'
  //   }

  //   if (window.innerWidth <= 426) {
  //     top["margin-top"] = '-70px';
  //     return top;
  //   }

  //   if (window.innerWidth <= 375) {
  //     top["margin-top"] = '-70px';
  //     return top;
  //   }

  //   if (window.innerWidth <= 320) {
  //     top["margin-top"] = '-70px';
  //     return top;

  //   }
  //   if (window.innerWidth <= 816 && this.frames.letterImges.length === 4) {
  //     top["margin-top"] = '-70px';
  //     return top;
  //   }

  //   if (window.innerWidth <= 859 && this.frames.letterImges.length === 9) {
  //     top["margin-top"] = '-70px';
  //     return top;
  //   }

  //   if (window.innerWidth <= 656 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length < 7)) {
  //     top["margin-top"] = '-70px';
  //     return top;
  //   }

  //   if (window.innerWidth <= 717 && this.frames.letterImges.length === 7) {
  //     top["margin-top"] = '-70px';
  //     return top;

  //   }

  //   if (window.innerWidth <= 789 && this.frames.letterImges.length === 8) {
  //     top["margin-top"] = '-70px';
  //     return top;
  //   }

  //   if (window.innerWidth <= 816 && this.frames.letterImges.length === 3) {
  //     top["margin-top"] = '-70px';
  //     return top
  //   }

  //   return top
  // }


  ngAfterViewChecked(): void {

    this.onResize()
  }

  ngOnInit(): void {
    this.frames.letterImges = [];
    this.frames.isOrder = false;
    super.myForm();
    super.imgColor();
    this.rout.navigate(['frame/form-frame'])

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
