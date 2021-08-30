
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
      height: '560px'
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
      height.height = '500px';
      return height;
    }

    if ((window.innerWidth <= 1440 && window.innerWidth > 1024) && this.frames.isOrder) {
      height.height = '850px'
      return height
    }

  
    // if ((window.innerWidth <= 1024 && window.innerWidth > 768) && this.frames.isOrder) {
    //   height.height = '800px'
    // }

    // if ((window.innerWidth <= 426 && window.innerWidth >375) && this.frames.isOrder) {
    //   height.height = '500px'
    //   return height
    // }

    // if(this.frames.isOrder && window.innerWidth<=1565){
    //   height.height = '700px';
    //   return height;
    // }




    // if (window.innerWidth <= 816 && this.frames.letterImges.length === 4) {
    //   height.height = '400px';
    //   return height;
    // }

    // if (window.innerWidth <= 816 && this.frames.letterImges.length === 3) {
    //   height.height = '400px';
    //   return height;
    // }

    // if (window.innerWidth <= 859 && this.frames.letterImges.length === 9) {
    //   height.height = '400px';
    //   return height;
    // }

    // if (window.innerWidth <= 656 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length < 7)) {
    //   height.height = '400px';
    //   return height;
    // }

    // if (window.innerWidth <= 717 && this.frames.letterImges.length === 7) {
    //   height.height = '400px';
    //   return height;

    // }

    // if (window.innerWidth <= 789 && this.frames.letterImges.length === 8) {
    //   height.height = '400px';
    //   return height;
    // }

    return height
  }


  btnSaveMedia() {
    let left = {
      "left": '40.7%'
    }

    if (window.innerWidth < 321) {
      left["left"] = '50px';
      return left;
    }


    if (window.innerWidth <= 375 && window.innerWidth > 320) {
      left["left"] = '70px';
      return left;
    }

    if (window.innerWidth <= 427 && window.innerWidth > 375) {
      left["left"] = '110px';
      return left;
    }

    if (window.innerWidth <= 768 && window.innerWidth > 427) {
      left['left'] = '270px'
    }

    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
      left['left'] = '40.7%'
    }



    return left
  }

  buttonWrapTop() {
    let top = {
      "top": '27px'
    }

    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
      top["top"] = '-45px';
      return top;
    }

    if (window.innerWidth <= 768 && window.innerWidth > 427) {
      top["top"] = '-45px';
      return top;
    }


    if (window.innerWidth <= 427 && window.innerWidth > 376) {
      top["top"] = '-40px';
      return top;
    }

    if (window.innerWidth < 376 && window.innerWidth > 320) {
      top["top"] = '-145px';
      return top;
    }

    if (window.innerWidth <= 320) {
      top["top"] = '-145px';
      return top;

    }


    if (window.innerWidth <= 816 && this.frames.letterImges.length === 4) {
      top["top"] = '-70px';
      return top;
    }

    if (window.innerWidth <= 859 && this.frames.letterImges.length === 9) {
      top["top"] = '-70px';
      return top;
    }

    if (window.innerWidth <= 656 && (this.frames.letterImges.length > 4 && this.frames.letterImges.length < 7)) {
      top["top"] = '-70px';
      return top;
    }

    if (window.innerWidth <= 717 && this.frames.letterImges.length === 7) {
      top["top"] = '-70px';
      return top;

    }

    if (window.innerWidth <= 789 && this.frames.letterImges.length === 8) {
      top["top"] = '-70px';
      return top;
    }

    if (window.innerWidth <= 816 && this.frames.letterImges.length === 3) {
      top["top"] = '-70px';
      return top
    }

    if (window.innerWidth <= 1024 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 9)) {
      top["top"] = '-100px';
      return top;
    }

    if (window.innerWidth <= 1440 && (this.frames.letterImges.length > 2 && this.frames.letterImges.length <= 9)) {
      top["top"] = '15px';
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
