
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FrameImag } from 'src/app/shared/frame-image';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-magnit',
  templateUrl: './magnit.component.html',
  styleUrls: ['./magnit.component.css']
})
export class MagnitComponent extends FrameImag implements OnInit {
  public superItems: any;
  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  heigth: number | undefined;
  width: number | undefined;
  scale: number = 1;

  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder) {
    super(frames, modalService, rout, form);
    super.imgColor();

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.heigth = this.block?.nativeElement.clientHeight | 1;
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.scale = window.innerWidth / this.width - 0.17;

    }

    if (this.frames.letterImges.length <= 4 && this.frames.letterImges.length) {
      if (window.innerWidth <= 1165) {
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

  public setStyle() {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.scale + ")"
    }
    return style
  }


  ngOnInit(): void {
    super.myForm()
    this.frames.letterImges = [];
    this.frames.isOrder = false;
  }

}
