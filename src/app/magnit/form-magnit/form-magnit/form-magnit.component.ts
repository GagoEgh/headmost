import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FrameImag } from 'src/app/frame-image/frame-image';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';
import { IdeaImageService } from 'src/app/idea/idea-image/idea-image.service';
import { ErroreMessageComponent } from 'src/app/frame/errore-message/errore-message/errore-message.component';
import { FrameService } from 'src/app/frame/frame/frame.service';

@Component({
  selector: 'app-form-magnit',
  templateUrl: './form-magnit.component.html',
  styleUrls: ['./form-magnit.component.css'],
})
export class FormMagnitComponent extends FrameImag implements OnInit {
  public validateForm: FormGroup = new FormGroup({});
  constructor(
    public frames: FramesServService,
    public modalService: NgbModal,
    public imgService: FrameImageService,
    public rout: Router,
    public form: FormBuilder,
    private _translate: TranslateService,
    public ideaImgService: IdeaImageService,
    public frameService:FrameService
  ) {
    super(
      frames,
      modalService,
      ideaImgService,
      imgService,
      rout,
      form,
      frameService
    );
    super.imgColor();
  }

  myForm(): void {
    //super.myForm();
    this.validateForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        super.textValid,
      ]),
    });
  }

  public onSubmit(): void {
    if (this.validateForm.invalid) {
      const modalRef = this.modalService.open(ErroreMessageComponent);
      setTimeout(() => {
        modalRef.dismiss();
      }, 1000);
      return;
    }
    this.frames.isImg = false;
    this.imgService.letterColorFone();
  }
  ngOnInit(): void {}
}
