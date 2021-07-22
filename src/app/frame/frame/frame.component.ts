import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FramesImg } from '../../shared/img-ramka';
import { NgbdModalContentComponent } from '../ngbd-modal-content/ngbd-modal-content.component';
import { FramesServService } from '../../shared/frames-serv.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  margin_top: number | undefined;
  frameWi: number | undefined;
  heigth: number | undefined;
  width: number | undefined;
  scale: number = 1;
  isActive = false;
  constructor(public frames: FramesServService, private modalService: NgbModal, private form: FormBuilder) { }
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

    this.frames.validateForm = new FormGroup({
      text: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(9)])
    })
    this.imgColor();
    this.frames.framesFoneGet().subscribe((el: any) => {
      this.frames.div = el.results;
      this.frames.background = el.results[0];

    })

    this.frames.getFrames().subscribe((el: any) => {
      this.frames.framesImge = el.results;
      this.frameClick(this.frames.index);
    })
  }

  imgColor() {
    this.frames.imgColorGet().subscribe((el: any) => {
      for (let i = 0; i < el.count; i++) {
        if (this.frames && this.frames.imgColor[i] && this.frames.imgColor[i].ceys) {
          this.frames.imgColor[i].ceys = el.results[i];
        }
      }
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

  imgFone(obj: any) {
    this.frames.painding.values = obj.values;
    this.frames.painding.id = obj.ceys.id;
    this.frames.letterColorFone();

  }

  onSubmit() {
    if (this.frames.validateForm.invalid) return;

    this.frames.isImg = false;
    this.frames.letterColorFone();

  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
  }

  deletImg(ev: boolean) {
    this.frames.isImg = ev;
    this.frames.validateForm.reset();
  }

  showFrame() {
    this.frames.showFrame()
  }

}
