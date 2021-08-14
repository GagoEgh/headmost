import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewChecked {
  public _unsubscribe$ = new Subject();
  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  heigth: number | undefined;
  width: number | undefined;
  scale: number = 1;
  isBlock: boolean = false;
  question_answer: any[] = [];
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



  constructor(public frames: FramesServService, public _translate: TranslateService) { }
  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.question_answer = [];
    this._translate.get('_about._questions').pipe(takeUntil(this._unsubscribe$)).subscribe((res: any) => {
      this.question_answer.push(...res)
    });
    
  }

  ngOnInit(): void {
    this._translate.get('_about._questions').pipe(takeUntil(this._unsubscribe$)).subscribe((res: any) => {
      this.question_answer.push(...res)
    })
  }

  showQuestion(ev:any,num:number){
    this.isBlock = !this.isBlock;
    ev.id = !!!ev.id;
    console.log(ev)

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
