import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tenkyu',
  templateUrl: './tenkyu.component.html',
  styleUrls: ['./tenkyu.component.css']
})
export class TenkyuComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
