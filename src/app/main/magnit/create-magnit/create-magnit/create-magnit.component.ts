import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaImageService } from 'src/app/global pages/ideas/idea-image/idea-image.service';
import { FrameImag } from 'src/app/main/frame-image/frame-image';
import { FrameImageService } from 'src/app/main/frame-image/frame-image.service';
import { FrameService } from 'src/app/main/frame/frame/frame.service';

@Component({
  selector: 'app-create-magnit',
  templateUrl: './create-magnit.component.html',
  styleUrls: ['./create-magnit.component.css'],
})
export class CreateMagnitComponent extends FrameImag implements OnInit {
  constructor(
    public frames: FramesServService,
    public modalService: NgbModal,
    public imgService: FrameImageService,
    public ideaImgService: IdeaImageService,
    public rout: Router,
    public form: FormBuilder,
    public frameService: FrameService,
    public activatedRoute: ActivatedRoute
  ) {
    super(
      frames,
      modalService,
      ideaImgService,
      imgService,
      rout,
      form,
      frameService,
      activatedRoute);
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
