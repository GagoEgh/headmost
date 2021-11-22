import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';


@Component({
  selector: 'app-form-frame',
  templateUrl: './form-frame.component.html',
  styleUrls: ['./form-frame.component.css']
})
export class FormFrameComponent extends FrameImag implements OnInit {
  constructor(public frames: FramesServService, private _translate: TranslateService,
    public imgService:FrameImageService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder,) {
    super(frames, modalService,imgService, rout, form);
   this._translate.use(this.frames.lang)
  }

  ngOnInit(): void {}
 
}
