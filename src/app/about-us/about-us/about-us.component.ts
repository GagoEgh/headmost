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
export class AboutUsComponent implements OnInit, AfterViewChecked, OnChanges {

  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  public _unsubscribe$ = new Subject();
  question_answer: any[] = [];
  heigth: number | undefined;
  width: number | undefined;
  scale: number = 1;
  caunt: number = 0;
  obj = {};


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.block?.nativeElement.clientWidth | 1;
   
    if (window.innerWidth <= 1165) {
      
      this.scale = window.innerWidth / this.width - 0.1;

      if (window.innerWidth <= 768) {
        this.scale = 0.7;
      }

      if(window.innerWidth<=559){
        this.scale = 0.25
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
    this.showQuestion(this.obj, this.caunt);
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.question_answer = [];
    this.createText();
    this.onResize()
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
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
