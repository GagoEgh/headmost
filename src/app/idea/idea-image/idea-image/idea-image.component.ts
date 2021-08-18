import { Component, ElementRef, OnInit,ViewChild, HostListener, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from '../../message/message.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-idea-image',
  templateUrl: './idea-image.component.html',
  styleUrls: ['./idea-image.component.css']
})
export class IdeaImageComponent implements OnInit {
  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  public _unsubscribe$ = new Subject();
  heigth: number | undefined;
  width: number | undefined;
  scale: number = 1;

  constructor(public frames: FramesServService, public activApi: ActivatedRoute, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.frames.spinner.show()
    
    this.activApi.params.subscribe((el: any) => {
      this.frames.imgCategory(el.id).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
        this.frames.ideaImg = el;
        this.frames.spinner.hide()
      })
    })

  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.heigth = this.block?.nativeElement.clientHeight | 1;
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1030) {
      this.scale = window.innerWidth / this.width - 0.44;
    }

    if(window.innerWidth <= 787){
      this.scale = 0.7;
      this.scale = window.innerWidth / this.width-0.2;
    }
  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.scale + ")"
    }

    return style
  }

  open() {
    const modalRef = this.modalService.open(MessageComponent);
    setTimeout(() => {
      modalRef.dismiss()
    }, 1000)

  }

  addOrder() {
    this.frames.spinner.show()
    let obj = {
      user: this.frames.userData.user,
      created_frame: this.frames.ideaImg.id
    }

    this.frames.orderCard(obj).pipe(takeUntil(this._unsubscribe$)).subscribe((el:any)=>{
      this.frames.orderList.push(el);
      this.open();
      this.frames.spinner.hide()
    })
  }
  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}