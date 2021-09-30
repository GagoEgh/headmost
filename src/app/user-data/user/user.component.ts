import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewChecked {
  //@ViewChild("block", { static: false }) block: ElementRef | undefined;
  width: number | undefined;
  scale: number = 1;
  constructor(public frames: FramesServService) { }
  ngAfterViewChecked(): void {
    //this.onResize()
  }

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.width = this.block?.nativeElement.clientWidth | 1;
  //   if (window.innerWidth <= 1165) {
  //     this.scale = window.innerWidth / this.width - 0.34;

  //     if (window.innerWidth <= 1025) {
  //       this.scale = 0.7;
  //       this.scale = window.innerWidth / 1165 - 0.1;
  //       console.log(this.scale)
  //     }

  //     if (window.innerWidth <= 768) {
  //       this.scale = 0.9;
  //     }
  //   }
  // }

  ngOnInit(): void {
  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, 0)" + "scale(" + this.scale + ")"
    }
    return style
  }



}
