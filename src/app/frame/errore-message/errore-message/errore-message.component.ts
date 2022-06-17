import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-errore-message',
  templateUrl: './errore-message.component.html',
  styleUrls: ['./errore-message.component.css']
})
export class ErroreMessageComponent implements OnInit {
  @Input() isMagnitText = false
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

}
