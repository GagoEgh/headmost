import { Component, ElementRef, OnInit, ViewChild, HostListener, } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { MessageComponent } from '../../message/message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginComponent } from 'src/app/register/login/login.component';


@Component({
  selector: 'app-idea-image',
  templateUrl: './idea-image.component.html',
  styleUrls: ['./idea-image.component.css']
})
export class IdeaImageComponent implements OnInit {
  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  public _unsubscribe$ = new Subject();
  private heigth: number | undefined;
  private width: number | undefined;
  public scale: number = 1;

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
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1030) {
      this.scale = window.innerWidth / this.width - 0.44;
    }
  }

  public setStyle(): object {
    let style = {
      transform: "translate(-7%, -5%)" + "scale(" + this.scale + ")"
    }

    return style
  }

  private open(): void {
    const modalRef = this.modalService.open(MessageComponent);
    setTimeout(() => {
      modalRef.dismiss()
    }, 1000)
  }

  public addOrder(): void {
    if (localStorage.getItem('loginAutorization')) {
      let obj = {
        user: this.frames.userData.user,
        created_frame: this.frames.ideaImg.id
      }
      this.frames.spinner.show();
      this.frames.orderCard(obj).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
        this.frames.orderList.push(el);
        this.open();
        this.frames.spinner.hide()
      })
    } else {
      const modalRef = this.modalService.open(LoginComponent);
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
