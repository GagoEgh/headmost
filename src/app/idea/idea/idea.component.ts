import { Component, HostListener, OnInit } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from '../message/message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  frameIdeas: any[] = [];
 // frameImgs: any[] = [];
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

  constructor(public frames: FramesServService, private modalService: NgbModal,private rout:Router) {
  }

  open() {
    const modalRef = this.modalService.open(MessageComponent);
    setTimeout(() => {
      modalRef.dismiss()
    }, 1000)

  }


  appendItems() {
    this.frames.spinner.show()
    this.frames.frameCategoryImg('', 1, this.offset).subscribe((el: any) => {
      this.frames.ideaFrames.push(...el.results);
      this.offset += 10;
      this.count = el.count;
      this.frames.spinner.hide()
    })

  }

  onScrollDown(ev: any) {
    if (this.count > this.frames.ideaFrames.length) {
      this.appendItems();
    }
  }

  ngOnInit(): void {
  //  this.frames.spinner.show()
    this.onResize();
    this.offset = 0;
    this.frames.frameCategory().subscribe((el: any) => {
      this.frameIdeas = el.results;
      // setTimeout(()=>{
      //   this.frames.spinner.hide()
      // },300)
      
    })

    if (window.innerWidth <= 772) {
      this.scrollDistance = 1;
      this.scrollUpDistance = 3;
    }
    this.appendItems();
  }

  showBar() {
    return this.isBar = !this.isBar;
  }

  addOrder(index: number) {
   // this.frames.spinner.show();
    let obj = {
      user: this.frames.userData.user,
      created_frame: this.frames.ideaFrames[index].id
    }

    this.frames.orderCard(obj).subscribe((el: any) => {
      this.frames.orderList.push(el);
      this.open()
     // this.frames.spinner.hide()
    })
  }

  imgInfo(img:any){
    console.log(img);
    this.rout.navigate(['/idea/'+img.id])
  }
}


