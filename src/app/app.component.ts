import { Component } from '@angular/core';
import { FramesServService } from './shared/frames-serv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public frames:FramesServService){}
  title = 'headmost';
}
