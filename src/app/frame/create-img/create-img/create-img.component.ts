import { AfterViewChecked, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FrameImag } from 'src/app/shared/frame-image';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Letter } from '../../../shared/img-ramka';




@Component({
  selector: 'app-create-img',
  templateUrl: './create-img.component.html',
  styleUrls: ['./create-img.component.css']
})
export class CreateImgComponent extends FrameImag implements OnInit, AfterViewChecked {

  // @ViewChild("block", { static: false }) block: ElementRef | undefined;
  // width: number | undefined;

  public _unsubscribe$ = new Subject()
  letterChar = 0;
  isCreate = true;
  bottomText: FormGroup = new FormGroup({});
  validateForm: FormGroup = new FormGroup({});

  topLettering: Letter = {
    isSpan: false,
    isMenu: false,
    isForm: false
  };

  bottomLettering: Letter = {
    isSpan: false,
    isMenu: false,
    isForm: false
  }

  @Output() mainApp: EventEmitter<boolean> = new EventEmitter();

  constructor(public frames: FramesServService, public rout: Router,
    public form: FormBuilder, public modalService: NgbModal) {
    super(frames, modalService, rout, form);

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

  public setStyle() {
    let style = {
      transform: "translate(-50%, 0)" + "scale(" + this.frames.scale + ")"
    }
    return style
  }

  buttonWrapTop() {
    let top = {
      "top": '70px'
    }

    if (this.frames.isOrder && window.innerWidth <= 320 && this.frames.letterImges.length>2 ) {
      top["top"] = '20px';
      return top
    }

    if (window.innerWidth <= 320 && (this.frames.letterImges.length > 0 && this.frames.letterImges.length <= 4)) {
      top["top"] = '545px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 376 && this.frames.letterImges.length>2 ) {
      top["top"] = '20px';
      return top
    }

    if (window.innerWidth <= 376 && this.frames.letterImges.length > 4) {
      top["top"] = '545px';
      return top
    }

    
    if (this.frames.isOrder && window.innerWidth <= 426 && this.frames.letterImges.length>2 ) {
      top["top"] = '-165px';
      return top
    }

    if (window.innerWidth <= 426 && this.frames.letterImges.length > 4) {
      top["top"] = '415px';
      return top
    }

    if (window.innerWidth <= 426 && (this.frames.letterImges.length >= 3 && this.frames.letterImges.length < 5)) {
      top["top"] = '325px';
      return top
    }

   

    if (this.frames.isOrder && window.innerWidth <= 768 && (this.frames.letterImges.length>=3 && this.frames.letterImges.length <= 9)) {
      top["top"] = '-280px';
      return top
    }

    if (window.innerWidth <= 768 && (this.frames.letterImges.length >=3 && this.frames.letterImges.length < 5)) {
      top["top"] = '85px';
      return top
    }

    if (window.innerWidth <= 768 && this.frames.letterImges.length > 4) {
      top["top"] = '335px';
      return top
    }

    if (window.innerWidth <= 1025 && (this.frames.letterImges.length <= 4 && this.frames.letterImges.length > 2)) {
      top["top"] = '270px';
      return top
    }

    if (window.innerWidth <= 1025 && this.frames.letterImges.length > 4) {
      top["top"] = '110px';
      return top
    }

    if (window.innerWidth <= 1656 && this.frames.letterImges.length > 4) {
      top["top"] = '120px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 1656) {
      top['top'] = '0';
      return top
    }
    return top
  }

  deletImg() {
    this.rout.navigate(['frame/form-frame']);
    this.frames.validateForm.reset()
  }

  deleteTopProprty() {
    this.topLettering.isSpan = false;
    this.topLettering.isMenu = false;
    this.validateForm.reset();

  }

  deleteBottomProprty() {
    this.bottomLettering.isMenu = false;
    this.bottomLettering.isSpan = false;
    this.bottomText.reset();
  }

  onMouseleave() {
    if (!this.validateForm.get('topText')?.value) {
      this.topLettering.isMenu = false;
      this.topLettering.isForm = false;
    }

    if (!this.bottomText.get('btmText')?.value) {
      this.bottomLettering.isMenu = false;
      this.bottomLettering.isForm = false;
    }

    if (this.validateForm.get('topText')?.value) {
      this.frames.topText = this.validateForm.get('topText')?.value;
      this.topLettering.isSpan = true;
      this.topLettering.isMenu = false;
    }

    if (this.bottomText.get('btmText')?.value) {
      this.frames.btmText = this.bottomText.get('btmText')?.value;
      this.bottomLettering.isSpan = true;
      this.bottomLettering.isMenu = false;
    }

  }

  onMouseenter() {
    if (!this.validateForm.get('topText')?.value) {
      this.topLettering.isMenu = true;
      this.topLettering.isSpan = false;
      this.topLettering.isForm = true;
    }


    if (!this.bottomText.get('btmText')?.value) {
      this.bottomLettering.isMenu = true;
      this.bottomLettering.isForm = true;
      this.bottomLettering.isSpan = false;
    }

    if (this.validateForm.get('topText')?.value) {
      this.topLettering.isMenu = true;
    }

    if (this.bottomText.get('btmText')?.value) {
      this.bottomLettering.isMenu = true;
    }

  }


  ngOnInit(): void {
    this.validateForm = this.form.group(
      { topText: [null] },
    );
    this.bottomText = this.form.group(
      { btmText: [null] }
    )
    this.frames.isMessage = false;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }



}
