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
  onResize(): void {
    this.width = this.block?.nativeElement.clientWidth | 1;

    if (window.innerWidth <= 1165) {
      this.frames.scale = window.innerWidth / this.width - 0.35;
    }

    if (window.innerWidth <= 560) {
      this.frames.scale = window.innerWidth / this.width - 0.04;
    }

    if (this.frames.letterImges.length) {
      this.frames.scale = 1;
      if (window.innerWidth <= 1250) {
        this.frames.scale = window.innerWidth / 1180;
      }

    }

  }

  public conteinerHeight(): object {
    let height = {
      height: '538px'
    }

    if (this.frames.isOrder && window.innerWidth <= 650) {
      height.height = '1000px';
      return height;
    }

    if (this.frames.isOrder && window.innerWidth <= 960) {
      height.height = '1500px';
      return height;
    }

    if (this.frames.isOrder && window.innerWidth <= 2000) {
      height.height = '1867px';
      return height;
    }
    return height
  }

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

  public btnWrapMargin(): object {
    let margin = { "margin-top": '122px' }
    return margin
  }

  public buttonWrapTop(): object {
    let top = {
      "margin-top": '79.5px'
    }

    if (this.frames.isOrder && window.innerWidth <= 1024) {
      top["margin-top"] = '125px';

      if (this.frames.isOrder && window.innerWidth <= 340) {
        top["margin-top"] = '-385px';
        return top
      }

      if (this.frames.isOrder && window.innerWidth <= 650) {
        top["margin-top"] = '-520px';
        return top
      }

      if (this.frames.isOrder && window.innerWidth <= 768) {
        top["margin-top"] = '0px';
        return top
      }

      if (this.frames.isOrder && window.innerWidth <= 960) {
        top["margin-top"] = '-270px';
        return top
      }

      return top
    }


    if (this.frames.isOrder && window.innerWidth <= 2000) {
      top["margin-top"] = '80px';
      return top
    }
    return top
  }

  public buttonWrapTopSave(): object {
    let top = {
      "margin-top": "-7px"
    }

    if (window.innerWidth <= 768 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 9)) {
      top["margin-top"] = '61px';
      return top
    }

    return top
  }

  public frameClick(id: number): void {
    this.frames.index = id;
    this.frames.frame = this.frames.framesImge.find(item => item.id === this.frames.index);

  }

  public getFrameId(img: FramesImg): boolean {
    return img.id === this.frames.index
  }

  public changeBg(bg: any): void {
    this.frames.background = bg;
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
