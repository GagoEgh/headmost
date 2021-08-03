import { Component, HostListener, OnInit } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from '../message/message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  ideaImages: any[] = [];
  public _unsubscribe$ = new Subject()
  throttle = 150;
  scrollDistance = 0.5;
  scrollUpDistance = 2;
  category = '';
  offset = 0;
  count = 0;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.frames.isBar = window.innerWidth <= 790 ? false : true
  }

  constructor(public frames: FramesServService,
    private _activatedRoute: ActivatedRoute,
    private modalService: NgbModal, private rout: Router) {
  }


  ngOnInit(): void {
    this.ideaImages = []
    this.onResize();
    this.offset = 0;
window.scrollTo(0,0)
    if (window.innerWidth <= 772) {
      this.scrollDistance = 1;
      this.scrollUpDistance = 3;
    }

    this.checkQueryParams();
    
  }

  private checkQueryParams() {
    this._activatedRoute.queryParams.pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
      this.offset = 0; 
      this.ideaImages = [];
      this.category = el.category;
      this.category = this.category === undefined?'':this.category;
      this.appendItems();
    })
  }


  open() {
    const modalRef = this.modalService.open(MessageComponent);
    setTimeout(() => {
      modalRef.dismiss()
    }, 1000)

  }


   appendItems() {     
     this.frames.spinner.show()
     this.frames.frameCategoryImg(this.category, 1, this.offset).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
        this.offset += 10;
        this.ideaImages.push(...el.results);
        this.frames.spinner.hide();
      })
   }

  onScrollDown(ev: any) {
    console.log('scroll');
    
    this.appendItems();
  }



  showBar() {
    return this.frames.isBar = !this.frames.isBar;
  }

  addOrder(index: number) {

    let obj = {
      user: this.frames.userData.user,
      created_frame: this.ideaImages[index].id
    }

    this.frames.orderCard(obj).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
      this.frames.orderList.push(el);
      this.open()
    })


  }

  imgInfo(img: any) {
    this.rout.navigate(['/idea/idea-imags/' + img.id]);
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}


