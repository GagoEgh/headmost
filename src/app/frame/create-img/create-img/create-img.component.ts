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


  ngOnInit(): void {

    this.validateForm = this.form.group(
      { topText: [null] },
    );
    this.bottomText = this.form.group(
      { btmText: [null] }
    )
    this.frames.isMessage = false;
  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, 0)" + "scale(" + this.frames.scale + ")"
    }
    return style
  }




  deletImg() {
    this.rout.navigate(['frame/form-frame']);
    this.frames.validateForm.reset();
    this.frames.isImg = true;
    if (this.frames.isOrder) {
      this.frames.isImg = true;
      this.frames.isOrder = false;
      this.rout.navigate(['frame/form-frame']);
      this.frames.validateForm.reset();
    }
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


  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
