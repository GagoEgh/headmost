import { Component, ElementRef, OnInit, ViewChild, HostListener, } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { MessageComponent } from '../../message/message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginComponent } from 'src/app/register/login/login.component';
import { CardItemResults, FrameDetalis } from 'src/app/interface/frame-response';
import { IdeaImageService } from '../idea-image.service';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';
import { WordResult } from 'src/app/interface/WordResult';


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

  constructor(public frames: FramesServService, public ideaIMageService: IdeaImageService,
    public rout: Router, public activApi: ActivatedRoute, public frameImageService: FrameImageService,
    private modalService: NgbModal) { }
  ngOnInit(): void {
    this.frames.spinner.show()
    this.goIdeaCategory();
  
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

  private goIdeaCategory(): void {
    this.activApi.params.subscribe((idea: { [keys: string]: number }) => {
      this.ideaIMageService.imgCategory(idea.id).pipe(takeUntil(this._unsubscribe$)).subscribe((frameDetalis: FrameDetalis) => {
        this.ideaIMageService.ideaImg = frameDetalis;
        
        this.frames.spinner.hide()
      })
    })
  }

  private open(): void {
    const modalRef = this.modalService.open(MessageComponent);
    setTimeout(() => {
      modalRef.dismiss()
    }, 1000)
  }

  public addOrder(): void {
    if (localStorage.getItem('loginAutorization')) {
      let userCard = {
        user: this.frames.userData.user,
        created_frame: this.ideaIMageService.ideaImg.id
      }
      this.frames.spinner.show();
      this.frames.orderCard(userCard).pipe(takeUntil(this._unsubscribe$)).subscribe((cardItem: CardItemResults) => {
        this.frames.orderList.push(cardItem);
        this.open();
        this.frames.spinner.hide()
      })
    } else {
      const modalRef = this.modalService.open(LoginComponent);
    }
  }

  public myFrame() {
    console.log('is silki ',this.frames.isSilki);
    console.log(' ideaIMageService   ideaImg ', this.ideaIMageService.ideaImg)
    this.frames.isSilki = true;
    this.frames.isImg = false;
    this.frames.text = this.ideaIMageService?.ideaImg?.word;
    this.frameImageService.letterGet().subscribe((wordResult: WordResult[]) => {
      this.frames.letterImges = wordResult;
      this.frames.letterImges = this.frames.letterImges.filter(img => {
        return !img.not_found
      })
      this.rout.navigate(['/frame/create-img'], { queryParams: { type: 'frame', text: this.ideaIMageService?.ideaImg?.word } })
    })

  }
  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
