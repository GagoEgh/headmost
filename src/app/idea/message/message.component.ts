import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {}
  

}
