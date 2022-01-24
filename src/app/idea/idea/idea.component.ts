import { FramesServService } from 'src/app/shared/frames-serv.service';
import { MessageComponent } from '../message/message.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginComponent } from 'src/app/register/login/login.component';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { CardItemResults, FrameDetalis } from 'src/app/interface/frame-response';
import { IdeaService } from './idea.service';


@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  public _unsubscribe$ = new Subject();
  public ideaImages: FrameDetalis[] = [];
  private scrollDistance = 0.5;
  private scrollUpDistance = 2;
  private throttle = 150;
  private category = '';
  private offset = 0;
  private count = 0;

  constructor(public frames: FramesServService, public ideaService: IdeaService,
    private _activatedRoute: ActivatedRoute,
    private modalService: NgbModal, private rout: Router) {
  }


  ngOnInit(): void {
    this.ideaImages = []
    this.offset = 0;
    window.scrollTo(0, 0);

    if (window.innerWidth <= 772) {
      this.scrollDistance = 1;
      this.scrollUpDistance = 3;
    }

    this.checkQueryParams();
  }

  private checkQueryParams(): void {
    this._activatedRoute.queryParams.pipe(takeUntil(this._unsubscribe$)).subscribe((idCategory: { [key: string]: string }) => {
      this.offset = 0;
      this.ideaImages = [];
      this.category = idCategory.category;
    //  this.category = this.category === undefined ? '' : this.category;
      this.appendItems();

    })
  }

  private open(): void {
    const modalRef = this.modalService.open(MessageComponent);
    setTimeout(() => {
      modalRef.dismiss()
    }, 1000)

  }

  private appendItems(): void {
    this.frames.spinner.show()
    this.ideaService.frameCategoryImg(this.category, 1, this.offset).pipe(takeUntil(this._unsubscribe$)).subscribe((frameDetalis: ServerResponce<FrameDetalis[]>) => {
      this.offset += 10;
      this.ideaImages.push(...frameDetalis.results);
      this.frames.spinner.hide();
    })
  }

  onScrollDown(ev: any) {
    this.appendItems();
  }

  public addOrder(index: number): void {
    let data = {
      user: this.frames.userData.user,
      created_frame: '' + this.ideaImages[index].id
    }
    if (localStorage.getItem('loginAutorization')) {
      this.frames.orderCard(data).pipe(takeUntil(this._unsubscribe$)).subscribe((cardItem: CardItemResults) => {
        this.frames.orderList.push(cardItem);
        this.open()
      })
    } else {
      const ref = this.modalService.open(LoginComponent)
    }

  }

  public imgInfo(img: { id: number }): void {
    this.rout.navigate(['/idea/idea-imags/' + img.id]);
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}


