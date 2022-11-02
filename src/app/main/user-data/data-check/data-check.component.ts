import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-data-check',
  templateUrl: './data-check.component.html',
  styleUrls: ['./data-check.component.css']
})
export class DataCheckComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,public _translate:TranslateService) { }

  ngOnInit(): void {
  }

}
