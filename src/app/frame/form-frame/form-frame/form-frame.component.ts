import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FrameImag } from 'src/app/shared/frame-image';

@Component({
  selector: 'app-form-frame',
  templateUrl: './form-frame.component.html',
  styleUrls: ['./form-frame.component.css']
})
export class FormFrameComponent extends FrameImag implements OnInit,AfterViewChecked {

  // @ViewChild("block", { static: false }) block: ElementRef | undefined;
  // width: number | undefined;

  constructor(public frames:FramesServService,private _translate: TranslateService,public modalService: NgbModal,
    public rout: Router,public form: FormBuilder,) {
    super(frames, modalService, rout, form);

    this._translate.use(this.frames.lang)
   }

  ngOnInit(): void {
  }

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.width = this.block?.nativeElement.clientWidth | 1;
  //   if (window.innerWidth <= 1165) {
  //     this.frames.scale = window.innerWidth / this.width - 0.34;

  //     if (window.innerWidth <= 768) {
  //       this.frames.scale = 0.7
  //       this.frames.scale = window.innerWidth / this.width - 0.19;

  //     }

  //     if (window.innerWidth <= 425) {
  //       this.frames.scale = 0.47;
  //       this.frames.scale = window.innerWidth / this.width - 0.04;

  //     }

  //     if (window.innerWidth <= 375) {
  //       this.frames.scale = 0.4;
  //       this.frames.scale = window.innerWidth / this.width - 0.04;

  //     }

  //     if (window.innerWidth <= 320) {
  //       this.frames.scale = 0.37;
  //       this.frames.scale = window.innerWidth / this.width - 0.04;

  //     }

  //   }

  //   if (this.frames.letterImges.length <= 4 && this.frames.letterImges.length) {

  //     this.width = this.block?.nativeElement.clientWidth | 1;

  //     if (window.innerWidth <= 2102) {
  //       this.frames.scale = 0.9;
  //     }

  //     if (window.innerWidth <= 1536) {
  //       this.frames.scale = 0.9;
  //       let num = window.innerWidth / 1536;
  //       this.frames.scale = num - 0.1;
  //     }

  //     if (window.innerWidth <= 816) {
  //       this.frames.scale = 0.6;
  //       this.frames.scale = window.innerWidth / this.width - 0.9;
  //     }

  //     if (window.innerWidth <= 768 && this.frames.letterImges.length === 3) {
  //       this.frames.scale = 0.8;
  //       this.frames.scale = window.innerWidth / this.width - 1.27;
  //     }

  //     if (window.innerWidth <= 656) {
  //       this.frames.scale = 0.3;
  //     }

  //   }

  //   if (this.frames.letterImges.length > 4 && this.frames.letterImges.length) {

  //     this.frames.scale = 0.6;

  //     if (window.innerWidth <= 2006 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
  //       this.frames.scale = 0.6;
  //       if (window.innerWidth <= 856 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
  //         this.frames.scale = 0.4;
  //       }

  //     }

  //     if (window.innerWidth <= 1063 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
  //       this.frames.scale = 0.6;
  //       if (window.innerWidth <= 686 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
  //         this.frames.scale = 0.3;
  //       }
  //     }

  //     if (window.innerWidth === 859 && this.frames.letterImges.length === 9) {
  //       this.frames.scale = 0.27;
  //     }

  //     if (window.innerWidth === 789 && this.frames.letterImges.length === 8) {
  //       this.frames.scale = 0.27;
  //     }

  //     if (window.innerWidth === 717 && this.frames.letterImges.length === 7) {
  //       this.frames.scale = 0.27;
  //     }
  //   }

  // }

  ngAfterViewChecked(): void {
   // this.onResize()
   
  }

  // public setStyle() {
  //   let style = {
  //     transform: "translate(-50%, 0)" + "scale(" + this.frames.scale + ")"
  //   }
  //   return style
  // }

  
  buttonWrapTop() {
    let top = {
      "top": '-5px'
    }

    if (window.innerWidth <= 320) {
      top["top"] = '390px';
      return top;
    }

    if (window.innerWidth <= 375) {
      top["top"] = '260px';
      return top;
    }


    if (window.innerWidth <= 426) {
      top["top"] = '450px';
      return top;

    }

    if (window.innerWidth <= 768) {
      top["top"] = '150px';
      return top;

    }

    if (window.innerWidth <= 1024) {
      top["top"] = '60px';
      return top;

    }

    return top
  }
}
