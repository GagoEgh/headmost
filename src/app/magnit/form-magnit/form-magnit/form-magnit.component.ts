import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';
import { IdeaImageService } from 'src/app/idea/idea-image/idea-image.service';



@Component({
  selector: 'app-form-magnit',
  templateUrl: './form-magnit.component.html',
  styleUrls: ['./form-magnit.component.css']
})
export class FormMagnitComponent  extends FrameImag implements OnInit {

  constructor(public frames: FramesServService, public modalService: NgbModal,public imgService:FrameImageService,
    public rout: Router, public form: FormBuilder, private _translate: TranslateService,public ideaImgService:IdeaImageService,) {
    super(frames, modalService,ideaImgService,imgService, rout, form);
    super.imgColor();

  }

  ngOnInit(): void {}
  

}
