import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FrameImag } from 'src/app/shared/frame-image';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Letter } from '../../../shared/img-ramka';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-img',
  templateUrl: './create-img.component.html',
  styleUrls: ['./create-img.component.css']
})
export class CreateImgComponent extends FrameImag implements OnInit {

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

  public setStyle() {
    let style = {
      transform: "translate(-50%, 0)" + "scale(" + this.frames.scale + ")"
    }
    return style
  }

  buttonWrapTop() {
    let top = {
      "top": '79.5px'
    }

    if (this.frames.isOrder && window.innerWidth <= 320 && this.frames.letterImges.length > 2) {
      top["top"] = '-10px';
      return top
    }

    if (window.innerWidth <= 320 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 4)) {
      top["top"] = '545px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 376 && this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9) {
      top["top"] = '-164px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 376 && this.frames.letterImges.length > 2 && this.frames.letterImges.length <5) {
      top["top"] = '-240px';
      return top
    }

    if (window.innerWidth <= 376 && this.frames.letterImges.length > 4) {
      top["top"] = '400px';
      return top
    }

    if (window.innerWidth <= 376 && (this.frames.letterImges.length >= 3 && this.frames.letterImges.length < 5)) {
      top["top"] = '220px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 426 && this.frames.letterImges.length > 4 && this.frames.letterImges.length <=9) {
      top["top"] = '23px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 426 && this.frames.letterImges.length > 2 && this.frames.letterImges.length <5) {
      top["top"] = '31px';
      return top
    }

    if (window.innerWidth <= 426 && this.frames.letterImges.length > 4) {
      top["top"] = '440px';
      return top
    }

    if (window.innerWidth <= 426 && (this.frames.letterImges.length >= 3 && this.frames.letterImges.length < 5)) {
      top["top"] = '350px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 768 && (this.frames.letterImges.length >= 3 && this.frames.letterImges.length <= 9)) {
      top["top"] = '-401px';
      return top
    }

    if (window.innerWidth <= 768 && (this.frames.letterImges.length >= 3 && this.frames.letterImges.length < 5)) {
      top["top"] = '106px';
      return top
    }

    if (window.innerWidth <= 768 && this.frames.letterImges.length > 4) {
      top["top"] = '336px';
      return top
    }

    if ( this.frames.isOrder && window.innerWidth <= 1025 && this.frames.letterImges.length > 4) {
      top["top"] = '183px';
      return top
    }

    if (window.innerWidth <= 1025 && this.frames.letterImges.length > 4) {
      top["top"] = '130px';
      return top
    }

    if (window.innerWidth <= 1025 && (this.frames.letterImges.length <= 4 && this.frames.letterImges.length > 2)) {
      top["top"] = '286px';
      return top
    }

    if ( this.frames.isOrder && window.innerWidth <= 1440 && this.frames.letterImges.length > 4) {
      top["top"] = '57px';
      return top
    }

    if (this.frames.isOrder && window.innerWidth <= 1440 && this.frames.letterImges.length <= 4 && this.frames.letterImges.length>2) {
      top["top"] = '0';
      return top
    }

    if (window.innerWidth <= 1440 && this.frames.letterImges.length <= 4 && this.frames.letterImges.length>2) {
      top["top"] = '111px';
      return top
    }

    
    if (window.innerWidth <= 1440 && this.frames.letterImges.length > 4) {
      top["top"] = '131px';
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
