import { Component, HostListener, OnInit } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  frameIdeas: any[] = [];
  frameImgs: any[] = [];
  isBar = true;
  throttle = 150;
  scrollDistance = 0.5;
  scrollUpDistance = 2;
  offset = 0;
  count = 0;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isBar = window.innerWidth <= 790 ? false : true
  }
  constructor(public frames: FramesServService) {

  }

  appendItems() {

    this.frames.frameCategoryImg('', 1, this.offset).subscribe((el: any) => {
      this.frameImgs.push(...el.results);
      this.offset += 10;
      this.count = el.count;
    })

  }

  onScrollDown(ev: any) {
    if (this.count > this.frameImgs.length) {
      this.appendItems();
    }

  }


  ngOnInit(): void {
    this.onResize();
    this.offset = 0;
    this.frames.frameCategory().subscribe((el: any) => {
      this.frameIdeas = el.results;
    })

    if (window.innerWidth <= 772) {
      this.scrollDistance = 1;
      this.scrollUpDistance = 3;
    }

    this.appendItems();

  }

  showBar() {
    return this.isBar = !this.isBar ;
  }

}
