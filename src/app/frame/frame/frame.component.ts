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

      if (window.innerWidth <= 426) {
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

    if (window.innerWidth <= 320) {
      height.height = '400px';
      return height;

    }

    if (this.frames.isOrder && window.innerWidth <= 376 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <=9)) {
      height.height = '850px';
      return height;
    }

    if (window.innerWidth <= 376) {
      height.height = '350px';
      return height;
    }

    if (this.frames.isOrder && window.innerWidth <= 426 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <=9)) {
      height.height = '1050px';
      return height;
    }

    if (window.innerWidth <= 426) {
      height.height = '400px';
      return height;
    }

    if (this.frames.isOrder && window.innerWidth <= 768 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 9)) {
      height.height = '1250px';
      return height;
    }

    if (this.frames.isOrder && window.innerWidth <= 1025 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length < 5)) {
      height.height = '1215px';
      return height;
    }
    if (this.frames.isOrder && window.innerWidth <= 1025 && this.frames.letterImges.length > 4) {
      height.height = '1450px';
      return height;
    }

    if (this.frames.isOrder && window.innerWidth <= 1441 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 9)) {
      height.height = '1349px';
      return height;
    }

    if (this.frames.isOrder && window.innerWidth <= 1536 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length < 5)) {
      height.height = '1510px';
      return height;
    }


    if (this.frames.isOrder && window.innerWidth <= 1536 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
      height.height = '1350px';
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

  buttonWrapTop() {
    let top = {
      "margin-top": '79.5px'
    }

    if (this.frames.isOrder && window.innerWidth <= 320 && this.frames.letterImges.length > 2) {
      top["margin-top"] = '-10px';
      return top
    }

    if (window.innerWidth <= 320 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 4)) {
      top["margin-top"] = '545px';
      return top
    }


    if (this.frames.isOrder && window.innerWidth <= 376 && this.frames.letterImges.length > 2 && this.frames.letterImges.length <=9) {
      top["margin-top"] = '-1200px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 426 && this.frames.letterImges.length > 2 && this.frames.letterImges.length <=9) {
      top["margin-top"] = '-1050px';
      return top
    }


    if (this.frames.isOrder && window.innerWidth <= 768 && (this.frames.letterImges.length <= 9 && this.frames.letterImges.length > 2)) {
      top["margin-top"] = '-680px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 1025 && this.frames.letterImges.length > 4) {
      top["margin-top"] = '-275px';
      return top
    }


    if (this.frames.isOrder && window.innerWidth <= 1025 && (this.frames.letterImges.length <= 4 && this.frames.letterImges.length > 2)) {
      top["margin-top"] = '-510px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 1440 && this.frames.letterImges.length > 2 && this.frames.letterImges.length <=9) {
      top["margin-top"] = '-423px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 1537 && (this.frames.letterImges.length <5 && this.frames.letterImges.length > 2)) {
      top["margin-top"] = '-310px'; //-310
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 1537 && (this.frames.letterImges.length <= 9 && this.frames.letterImges.length > 4)) {
      top["margin-top"] = '-470px';
      return top
    }

    if (window.innerWidth <= 1537 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <5)) {
      top["margin-top"] = '-260px';
      return top
    }

    if (window.innerWidth <= 1537 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
      top["margin-top"] = '-460px';
      return top
    }

   
    return top
  }

  buttonWrapTopSave(){
    let top = {
      "margin-top": '-7px'
    }

    if (window.innerWidth <= 768 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 9)) {
      top["margin-top"] = '61px';
      return top
    }

    return top
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
