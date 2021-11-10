import { AfterViewChecked, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AboutQuestion } from 'src/app/interface/img-ramka';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewChecked, OnChanges {
  public _unsubscribe$ = new Subject();
  public question_answer: AboutQuestion[] = [];
  private caunt: number = 0;
  private obj = {} as AboutQuestion;

  constructor(public frames: FramesServService, public _translate: TranslateService) { }

  ngOnInit(): void {
    this.createText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showQuestion(this.obj, this.caunt);
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.question_answer = [];
    this.createText();
  }

  private createText(): void {
    this._translate.get('About.questions').pipe(takeUntil(this._unsubscribe$)).subscribe((question: AboutQuestion[]) => {
      this.question_answer = question
    })
  }

  public showQuestion(question: AboutQuestion, num: number): void {
    if (question.id === this.question_answer[num].id) {
      this.obj = question;
      this.caunt = num;
      question.isBlock = !question.isBlock;
    }
  }

  private ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
