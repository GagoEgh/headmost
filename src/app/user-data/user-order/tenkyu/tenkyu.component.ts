import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-tenkyu',
  templateUrl: './tenkyu.component.html',
  styleUrls: ['./tenkyu.component.css']
})
export class TenkyuComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public _translate: TranslateService) { }
  @Input() status: any = '';
  public message: string = '';
  ngOnInit(): void {
  }

}
