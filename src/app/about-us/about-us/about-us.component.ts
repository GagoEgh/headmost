import { AfterViewChecked, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewChecked,OnChanges {
  public _unsubscribe$ = new Subject();
  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  heigth: number | undefined;
  width: number | undefined;
  scale: number = 1;
  question_answer: any[] = [];
  obj = {};
  caunt: number =0;

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
  ngOnChanges(changes: SimpleChanges): void {
    this.showQuestion(this.obj,this.caunt);
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.question_answer = [];
    this.createText();
    
  }

  ngOnInit(): void {
    this.createText();
 
  }

  createText() {
    this._translate.get('_about._questions').pipe(takeUntil(this._unsubscribe$)).subscribe((res: any) => {
      res.forEach((element: any) => {
        element.isBlock = JSON.parse(element.isBlock);
        this.question_answer.push(element)
      });

    })
  }

  showQuestion(ev: any, num: number) {
    if (ev.id === this.question_answer[num].id) {
      this.obj = ev;
      this.caunt = num;
      ev.isBlock = !ev.isBlock;
      
      console.log(ev)
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
