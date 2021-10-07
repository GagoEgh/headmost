import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-only',
  templateUrl: './only.component.html',
  styleUrls: ['./only.component.css']
})
export class OnlyComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,public _translate:TranslateService) { }

  ngOnInit(): void {
  }

}
