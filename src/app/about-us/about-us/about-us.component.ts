import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AboutQuestion } from 'src/app/modeles/img-ramka.modele';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewChecked, OnChanges {
  public _unsubscribe$ = new Subject();
  public question_answer: AboutQuestion[] = [];
  private caunt: number = 0;
  private aboutQuestion = {} as AboutQuestion;

  constructor(
    public frames: FramesServService,
    public _translate: TranslateService) { }

  ngOnInit(): void {
    this.createText();

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showQuestion(this.aboutQuestion, this.caunt);
  }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this.question_answer = [];
    this.createText();
  }

  private createText(): void {
    this._translate.get('About.questions')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((question: AboutQuestion[]) => {
        question.forEach((item: AboutQuestion) => {
          if (item.isBlock == 'false') {
            item.isBlock = false;
          }
        })
        this.question_answer = question;
      })
  }

  public showQuestion(question: AboutQuestion, num: number): void {
    if (question.id === this.question_answer[num].id) {
      this.aboutQuestion = question;
      this.caunt = num;
      question.isBlock = !question.isBlock;
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
