
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FrameImag } from 'src/app/shared/frame-image';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-magnit',
  templateUrl: './magnit.component.html',
  styleUrls: ['./magnit.component.css']
})
export class MagnitComponent extends FrameImag implements OnInit, AfterViewChecked {
  @ViewChild("block", { static: false }) block: ElementRef | undefined;

  private heigth: number | undefined;
  private width: number | undefined;
  public lightSheme = '';
  public blockStyle = {} as { [key: string]: string }
  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder, private _translate: TranslateService) {
    super(frames, modalService, rout, form);
    super.imgColor();
  }

  ngOnInit(): void {
    super.myForm();
    this.translateImgText()
    this.frames.letterImges = [];
    this.frames.isOrder = false;
    this.rout.navigate(['magnit/form-magnit']);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.block?.nativeElement.clientWidth | 1;

    if (window.innerWidth <= 1537) {
      let num = window.innerWidth / 1536;
      this.frames.magnit_scale = num - 0.1;
    }

    if (window.innerWidth <= 1025) {
      let num = window.innerWidth / 1025;
      this.frames.magnit_scale = num - 0.1;
    }

    if (window.innerWidth <= 769) {
      let num = window.innerWidth / 769;
      this.frames.magnit_scale = num - 0.3;
    }

    if (window.innerWidth <= 426) {
      let num = window.innerWidth / 425;
      this.frames.magnit_scale = num - 0.6;
    }
    this.conteinerHeight();
    this.setStyle();
  }


  private conteinerHeight(): void {

    if (window.innerWidth <= 2000 && this.frames.isOrder) {
      this.lightSheme = '1450px'

      if (window.innerWidth <= 1440 && this.frames.isOrder) {
        this.lightSheme = '1250px';
      }

      if (window.innerWidth <= 1026 && this.frames.isOrder) {
        this.lightSheme = '1300px';
      }
      if (window.innerWidth <= 971 && this.frames.isOrder) {
        this.lightSheme = '1500px';
      }

      if (window.innerWidth <= 768 && this.frames.isOrder) {
        this.lightSheme = '1300px';
      }

      if (window.innerWidth <= 600 && this.frames.isOrder) {
        this.lightSheme = '1000px';
      }
    }
  }


  private setStyle(): void {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.frames.magnit_scale + ")"
    }
    this.blockStyle = style;
  }

  private translateImgText(): void {
    this._translate.get('ImgTextValid').pipe(takeUntil(this._unsubscribe$))
      .subscribe((res: any) => {
        this.frames.placeholder = res["placeholder"];
      })
  }

  public ngAfterViewChecked(): void {
    this.onResize()
    this.setStyle()
  }
}
