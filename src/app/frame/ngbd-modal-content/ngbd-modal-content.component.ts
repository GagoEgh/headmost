import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './ngbd-modal-content.component.html',
  styleUrls: ['./ngbd-modal-content.component.css']
})
export class NgbdModalContentComponent  {

  constructor(public activeModal: NgbActiveModal) {}
}
