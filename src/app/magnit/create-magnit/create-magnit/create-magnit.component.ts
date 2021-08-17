import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FrameImag } from 'src/app/shared/frame-image';
import { FramesServService } from 'src/app/shared/frames-serv.service';

@Component({
  selector: 'app-create-magnit',
  templateUrl: './create-magnit.component.html',
  styleUrls: ['./create-magnit.component.css']
})
export class CreateMagnitComponent extends FrameImag implements OnInit {
  @Output() mainApp: EventEmitter<boolean> = new EventEmitter();
  constructor(public frames: FramesServService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder) {
    super(frames, modalService, rout, form);
  }

  ngOnInit(): void {
  }

}

