import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  heigth: number | undefined;
  width: number | undefined;
  scale: number = 1;

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

  public setStyle() {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.scale + ")"
    }
    return style
  }

  constructor(public frames:FramesServService) { }

  ngOnInit(): void {
  }

}
