import { FramesServService } from 'src/app/shared/frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';
import { IdeaImageService } from 'src/app/idea/idea-image/idea-image.service';
import { FrameService } from '../../frame/frame.service';

@Component({
  selector: 'app-form-frame',
  templateUrl: './form-frame.component.html',
  styleUrls: ['./form-frame.component.css'],
})
export class FormFrameComponent extends FrameImag implements
 OnInit, AfterContentChecked {
  constructor(
    public frames: FramesServService,
    private _translate: TranslateService,
    public imgService: FrameImageService,
    public modalService: NgbModal,
    public ideaImgService: IdeaImageService,
    public rout: Router,
    public form: FormBuilder,
    public frameService: FrameService,
    public activatedRoute:ActivatedRoute
  ) {
    super(
      frames,
      modalService,
      ideaImgService,
      imgService,
      rout,
      form,
      frameService,
      activatedRoute
    );
    this._translate.use(this.frames.lang);
  }

  ngOnInit(): void {}
  ngAfterContentChecked(): void {
    if(this.frames.validateForm.get("text")?.value == null){

      this.imgService.clearPrice()
    }

  }
}
