import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FramesImg } from '../../shared/img-ramka';
import { NgbdModalContentComponent } from '../ngbd-modal-content/ngbd-modal-content.component';
import { FramesServService } from '../../shared/frames-serv.service'
import { Subject } from 'rxjs';
import { takeLast, takeUntil } from 'rxjs/operators';
import { FrameImag } from 'src/app/shared/frame-image';
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
  scale: number = 1;

  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder,) {
    super(frames, modalService, rout, form)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.heigth = this.block?.nativeElement.clientHeight | 1;
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.scale = window.innerWidth / this.width - 0.1;

    }

    if (this.frames.letterImges.length <= 4 && this.frames.letterImges.length) {
      if (window.innerWidth <= 1165) {
        this.width += 280;
        this.scale = window.innerWidth / this.width - 0.2;
      }
    }

    if (this.frames.letterImges.length <= 2 && this.frames.letterImges.length) {
      if (window.innerWidth <= 1165) {
        this.width += 380;
        this.scale = window.innerWidth / this.width;
      }
    }
  }

  ngOnInit(): void {
    super.myForm();
    super.imgColor();
    this.frames.framesFoneGet().pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.frames.div = el.results;
      this.frames.background = el.results[0];

    })

    this.frames.getFrames().pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.frames.framesImge = el.results;
      this.frameClick(this.frames.index);
    })

  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.scale + ")"
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

  // deletImg(ev: boolean) {
  //   this.frames.isImg = ev;
  //   this.frames.validateForm.reset();
  // }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
