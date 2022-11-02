import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-ok-register',
  templateUrl: './ok-register.component.html',
  styleUrls: ['./ok-register.component.css']
})
export class OkRegisterComponent implements OnInit {

  public congratulations: string = '';
  public titlle: string = '';
  constructor(
    private registerService: RegisterService,
    private _translate: TranslateService,
    public frames: FramesServService) { }

  ngOnInit(): void {
    this._translate.get('Order.userData')
    .subscribe((res: any) => {
      this.congratulations = res.congratulations;
      this.titlle = res.congratulationsTitle;
    })
    this.registerService.isRegister = true;
  }

}
