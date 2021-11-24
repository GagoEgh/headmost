import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ServerResponce } from 'src/app/interface/img-ramka';
import { CategoryDetails } from 'src/app/interface/CategoryDetails';
import { IdeaNavService } from '../idea-nav.service';


@Component({
  selector: 'app-idea-nav',
  templateUrl: './idea-nav.component.html',
  styleUrls: ['./idea-nav.component.css']
})
export class IdeaNavComponent implements OnInit {
  public frameIdeas: CategoryDetails[] = [];
  public _unsubscribe$ = new Subject();
  public offset: number = 0;
  public id: number = 0;
  constructor(public frames: FramesServService,public ideaNavService:IdeaNavService,
    private _router: Router) { }

  ngOnInit(): void {
    this.offset = 0;
    this.ideaGroup(this.id)
    this.ideaNavService.frameCategory().pipe(takeUntil(this._unsubscribe$)).subscribe((categoryDetails: ServerResponce<CategoryDetails[]>) => {
      this.frameIdeas = categoryDetails.results;
    })
  }


  public ideaGroup(id: number | undefined = undefined): void {
    if (id) {
      this._router.navigate(['idea/idea-imags'], { queryParams: { category: id } });
      this.id = id
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
