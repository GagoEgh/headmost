import { AfterViewChecked, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AboutQuestion } from 'src/app/interface/AboutQuestion';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewChecked, OnChanges {

  @ViewChild("block", { static: false }) block: ElementRef | undefined;
  public _unsubscribe$ = new Subject();
  public question_answer: AboutQuestion[] = [];
  private width: number | undefined;
  public scale: number = 1;
  private caunt: number = 0;
  private obj: AboutQuestion = new AboutQuestion()
  
  constructor(public frames: FramesServService, public _translate: TranslateService) { }

  ngOnInit(): void {
    this.createText();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.block?.nativeElement.clientWidth | 1;
    if (window.innerWidth <= 1165) {
      this.scale = 1165 / this.width - 0.3;

      if (window.innerWidth <= 1025) {
        this.scale = 1025 / this.width - 0.2;
      }
      
      if (window.innerWidth <= 768) {
        this.scale = 768 / this.width - 0.2;
      }

      if (window.innerWidth <= 559) {
        this.scale = 0.25
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showQuestion(this.obj, this.caunt);
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.question_answer = [];
    this.createText();
    this.onResize()
  }

  public setStyle(): object {
    let style = {
      transform: "translate(-50%, -5%)" + "scale(" + this.scale + ")"
    }
    return style
  }

  private createText(): void {
    this._translate.get('About.questions').pipe(takeUntil(this._unsubscribe$)).subscribe((question: AboutQuestion[]) => {
      question.forEach((quest: AboutQuestion) => {
        this.question_answer.push(quest)
      });

    })
  }

  public showQuestion(question: AboutQuestion, num: number): void {
    if (question.id === this.question_answer[num].id) {
      this.obj = question;
      this.caunt = num;
      question.isBlock = !question.isBlock;
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
