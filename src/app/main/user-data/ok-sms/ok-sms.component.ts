import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-ok-sms',
  templateUrl: './ok-sms.component.html',
  styleUrls: ['./ok-sms.component.css']
})
export class OkSmsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,public _translate:TranslateService) { }

  ngOnInit(): void {
  }

}
