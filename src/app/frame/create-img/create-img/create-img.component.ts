import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';
import { LoginComponent } from 'src/app/register/login/login.component';
import { FrameImag } from 'src/app/shared/frame-image';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Letter } from '../../../shared/img-ramka';




@Component({
  selector: 'app-create-img',
  templateUrl: './create-img.component.html',
  styleUrls: ['./create-img.component.css']
})
export class CreateImgComponent extends FrameImag  implements OnInit {
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


  myOrder() {
    if (localStorage.getItem('loginAutorization')) {
      this.frames.spinner.show();
      this.frames.isTop = true;
      
      const imgs: any[] = [];
      this.frames.letterImges.forEach((i, index) => {
        const obj = {
          order_index: index,
          character: i.image.character,
          image: i.image.id,
          user_image: null,
        }
        imgs.push(obj)
      })
  
      const order = {
        frame: this.frames.frame.id,
        background: this.frames.background.id,
        word: this.frames.text.toUpperCase(),
        text_in_top: this.frames.topText,
        text_in_bottom: this.frames.btmText,
        images: imgs,
      }

      if (!this.frames.apiPhoto) {
        order.images = order.images.map((img: any) => {
          if (img.character === undefined) {
            img.character = this.letterChar;
            img.user_image = img.image;
            img.image = null;
          }
          return img;
        })
      }

      this.frames.getOrder(order).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
        this.frames.orderList = el;
        this.frames.isOrder = true;
        this.frames.spinner.hide()
      })
    } else {
      const modalRef = this.modalService.open(LoginComponent);

    }

  }


  ngOnDestroy(){
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }



}
