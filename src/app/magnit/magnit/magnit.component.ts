
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FrameImag } from 'src/app/shared/frame-image';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-magnit',
  templateUrl: './magnit.component.html',
  styleUrls: ['./magnit.component.css']
})
export class MagnitComponent extends FrameImag implements OnInit, AfterViewChecked {
  public superItems: any;
  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  heigth: number | undefined;
  width: number | undefined;

  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder, private _translate: TranslateService) {
    super(frames, modalService, rout, form);
    super.imgColor();

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.frames.magnit_scale = 0.7;


      if (window.innerWidth <= 768) {
        this.frames.magnit_scale = 0.7
        this.frames.magnit_scale = window.innerWidth / this.width - 0.2;

      }

      if (window.innerWidth <= 425) {
        this.frames.magnit_scale = 0.47;
        this.frames.magnit_scale = window.innerWidth / this.width - 0.04;

      }

      if (window.innerWidth <= 375) {
        this.frames.magnit_scale = 0.4;
        this.frames.magnit_scale = window.innerWidth / this.width - 0.04;

      }

      if (window.innerWidth <= 320) {
        this.frames.magnit_scale = 0.37;
        this.frames.magnit_scale = window.innerWidth / this.width - 0.04;

      }

    }

    if (this.frames.letterImges.length <= 4 && this.frames.letterImges.length) {

      this.width = this.block?.nativeElement.clientWidth | 1;

      if (window.innerWidth <= 2102) {
        this.frames.magnit_scale = 0.9;
      }

      if (window.innerWidth <= 1536) {
        this.frames.magnit_scale = 0.9;
        let num = window.innerWidth / 1536;
        this.frames.magnit_scale = num - 0.1;
      }

      if (window.innerWidth <= 816) {
        this.frames.magnit_scale = 0.6;
        this.frames.magnit_scale = window.innerWidth / this.width - 0.9;
      }

      if (window.innerWidth <= 768 && this.frames.letterImges.length === 3) {
        this.frames.magnit_scale = 0.7;

      }

      if (window.innerWidth <= 768 && this.frames.letterImges.length === 4) {
        this.frames.magnit_scale = 0.7;

      }

      if (window.innerWidth <= 656) {
        this.frames.magnit_scale = 0.3;
      }

    }

    if (this.frames.letterImges.length > 4 && this.frames.letterImges.length) {

      this.frames.magnit_scale = 0.7;

      if (window.innerWidth <= 2006 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
        this.frames.magnit_scale = 0.7;
        if (window.innerWidth <= 856 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
          this.frames.magnit_scale = 0.4;
        }

      }

      if (window.innerWidth <= 1063 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
        this.frames.magnit_scale = 0.7;
        if (window.innerWidth <= 686 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length <= 9)) {
          this.frames.magnit_scale = 0.3;
        }
      }

      if (window.innerWidth === 859 && this.frames.letterImges.length === 9) {
        this.frames.magnit_scale = 0.27;
      }

      if (window.innerWidth === 789 && this.frames.letterImges.length === 8) {
        this.frames.magnit_scale = 0.27;
      }

      if (window.innerWidth === 717 && this.frames.letterImges.length === 7) {
        this.frames.magnit_scale = 0.27;
      }
    }

  }


  conteinerHeight() {
    let height = {
      height: '650px'
    }

    if(this.frames.isOrder && window.innerWidth <=426){
      height.height = '570px';
      return height;
    }

    if (window.innerWidth <= 320) {
      height.height = '400px';
      return height;
    }


    if (window.innerWidth <= 375 && window.innerWidth > 320) {
      height.height = '400px';
      return height;
    }

    if (window.innerWidth <= 425 && window.innerWidth > 375) {
      height.height = '400px';
      return height;
    }

    if (window.innerWidth <= 1024 && window.innerWidth > 425) {
      height.height = '800px';
      return height;
    }

    if ((window.innerWidth <= 1640 && window.innerWidth > 1024) && this.frames.isOrder) {
      height.height = '1000px'
      return height
    }

    return height
  }


  buttonWrapTop() {
    let top = {
      "top": '950px'
    }

    if(window.innerWidth<=1024){
      top['top']='790px';
      return top;
    }

    if(window.innerWidth<=426){
      top['top']='600px';
      
      if( this.frames.isSilki){
        top['top']='750px';
        return top
      }
      return top;
    }

    if(window.innerWidth<=376){
      top['top']='500px';
      
      if( this.frames.isSilki){
        top['top']='650px';
        return top
      }
      return top;
    }

    return top
  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.frames.magnit_scale + ")"
    }
    return style
  }


  ngAfterViewChecked(): void {

    this.onResize()
    this.setStyle()
  }
  
  ngOnInit(): void {

    super.myForm();
    this._translate.get('_img-text-valid').pipe(takeUntil(this._unsubscribe$))
      .subscribe((res: any) => {
        this.frames.placeholder = res["_placeholder"];
      })
    this.frames.letterImges = [];
    this.frames.isOrder = false;

  }

}
