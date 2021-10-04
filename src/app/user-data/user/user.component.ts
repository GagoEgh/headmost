import { Component, OnInit } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  width: number | undefined;
  scale: number = 1;
  constructor(public frames: FramesServService) { }


  ngOnInit(): void {
  }

  public setStyle() {
    let style = {
      transform: "translate(-50%, 0)" + "scale(" + this.scale + ")"
    }
    return style
  }



}
