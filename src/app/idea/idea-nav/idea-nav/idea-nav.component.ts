import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { CategoryDetails } from 'src/app/interface/CategoryDetails';


@Component({
  selector: 'app-idea-nav',
  templateUrl: './idea-nav.component.html',
  styleUrls: ['./idea-nav.component.css']
})
export class IdeaNavComponent implements OnInit {
  public frameIdeas: any[] = [];
  public _unsubscribe$ = new Subject();
  public offset: number = 0;
  public id: number = 0;
  constructor(public frames: FramesServService,
    private _router: Router) { }

  ngOnInit(): void {
    this.offset = 0;
    this.frames.frameCategory().pipe(takeUntil(this._unsubscribe$)).subscribe((categoryDetails: ServerResponce<CategoryDetails[]>) => {
      this.frameIdeas = categoryDetails.results
    })
  }


  public ideaGroup(obj: any = undefined):void {
    if (obj) {
      this._router.navigate(['idea/idea-imags'], { queryParams: { category: obj.id } });
      this.id = obj.id
    } else {
      this._router.navigate(['idea/idea-imags'], { queryParams: { category: '' } });
      this.id = 0;
    }

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
