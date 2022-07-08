import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-no-usser',
  templateUrl: './no-usser.component.html',
  styleUrls: ['./no-usser.component.css']
})
export class NoUsserComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    public _translate: TranslateService) { }

  ngOnInit(): void {
  }

}
