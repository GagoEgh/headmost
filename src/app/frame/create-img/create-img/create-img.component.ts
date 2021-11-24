import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Letter } from 'src/app/interface/img-ramka';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';
import { IdeaImageService } from 'src/app/idea/idea-image/idea-image.service';

@Component({
  selector: 'app-create-img',
  templateUrl: './create-img.component.html',
  styleUrls: ['./create-img.component.css']
})
export class CreateImgComponent extends FrameImag implements OnInit {

  public _unsubscribe$ = new Subject()
  public bottomText: FormGroup = new FormGroup({});
  public validateForm: FormGroup = new FormGroup({});
  public topLettering = {} as Letter
  public bottomLettering: Letter = {} as Letter
  @Output() mainApp: EventEmitter<boolean> = new EventEmitter();

  constructor(public frames: FramesServService, public rout: Router,public ideaImgService:IdeaImageService,
   public imgService:FrameImageService, public form: FormBuilder, public modalService: NgbModal) {
    super(frames, modalService,ideaImgService,imgService,rout, form,);
  }

  ngOnInit(): void {
    this.validateForm = this.form.group({ topText: [null] },);
    this.bottomText = this.form.group({ btmText: [null] });
  }

  public deletImg(): void {
    this.rout.navigate(['frame/form-frame']);
    this.frames.validateForm.reset();
    this.frames.isImg = true;
    if (this.frames.isOrder) {
      this.frames.isImg = true;
      this.frames.isOrder = false;
      this.frames.conteinerHeight();
      this.rout.navigate(['frame/form-frame']);
      this.frames.validateForm.reset();
    }
  }

  public deleteTopProprty(): void {
    this.topLettering.isSpan = false;
    this.topLettering.isMenu = false;
    this.validateForm.reset();
  }

  public deleteBottomProprty(): void {
    this.bottomLettering.isMenu = false;
    this.bottomLettering.isSpan = false;
    this.bottomText.reset();
  }

  public onMouseleave(): void {
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
      this.topLettering.isSpan = false;
      this.topLettering.isMenu = false;
    }

    if (this.bottomText.get('btmText')?.value) {
      this.frames.btmText = this.bottomText.get('btmText')?.value;
      this.bottomLettering.isSpan = false;
      this.bottomLettering.isMenu = false;
    }

  }

  public onMouseenter(): void {
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
      this.topLettering.isSpan = true
    }

    if (this.bottomText.get('btmText')?.value) {
      this.bottomLettering.isMenu = true;
      this.bottomLettering.isSpan = true;
    }

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
