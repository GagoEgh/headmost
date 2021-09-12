import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-idea-nav',
  templateUrl: './idea-nav.component.html',
  styleUrls: ['./idea-nav.component.css']
})
export class IdeaNavComponent implements OnInit {
  frameIdeas: any[] = [];
  public _unsubscribe$ = new Subject();
  offset = 0;
  constructor(public frames:FramesServService,
    private _router:Router) { }

  ngOnInit(): void {
    this.offset = 0;
    this.frames.frameCategory().pipe(takeUntil(this._unsubscribe$)).subscribe((el:any)=>{
      this.frameIdeas = el.results
    })
  }

  ideaGroup(obj:any = undefined){
    if(obj){
      this._router.navigate(['idea/idea-imags'],{queryParams:{category:obj.id}})
    }else{
      this._router.navigate(['idea/idea-imags'],{queryParams:{category:''}})
    }
    
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
