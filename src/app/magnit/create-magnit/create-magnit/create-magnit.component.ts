import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';


@Component({
  selector: 'app-create-magnit',
  templateUrl: './create-magnit.component.html',
  styleUrls: ['./create-magnit.component.css']
})
export class CreateMagnitComponent extends FrameImag implements OnInit {

  constructor(public frames: FramesServService, public modalService: NgbModal,
    public imgService:FrameImageService, public rout: Router, public form: FormBuilder) {
    super(frames, modalService, imgService,rout, form);
  }

  ngOnInit(): void { }

  public deletImg(): void {
    this.rout.navigate(['magnit/form-magnit']);
    this.frames.validateForm.reset();
    this.frames.isImg = true;
    if (this.frames.isOrder) {
      this.frames.isImg = true;
      this.frames.isOrder = false;
      this.rout.navigate(['magnit/form-magnit']);
      this.frames.validateForm.reset();
    }
  }
}

