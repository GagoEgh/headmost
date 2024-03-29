import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaImageService } from 'src/app/global pages/ideas/idea-image/idea-image.service';
import { FrameImag } from 'src/app/main/frame-image/frame-image';
import { FrameImageService } from 'src/app/main/frame-image/frame-image.service';
import { ErroreMessageComponent } from 'src/app/main/frame/errore-message/errore-message/errore-message.component';
import { FrameService } from 'src/app/main/frame/frame/frame.service';

@Component({
  selector: 'app-form-magnit',
  templateUrl: './form-magnit.component.html',
  styleUrls: ['./form-magnit.component.css'],
})
export class FormMagnitComponent extends FrameImag implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public frames: FramesServService,
    public modalService: NgbModal,
    public imgService: FrameImageService,
    public rout: Router,
    public form: FormBuilder,
    private _translate: TranslateService,
    public ideaImgService: IdeaImageService,
    public frameService: FrameService
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
    super.imgColor();
  }

   myForm(): void {
    this.frames.validateForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.textValid,
      ]),
    });
  }
  public onSubmit(): void {
    if (this.frames.validateForm.invalid) {
      const modalRef = this.modalService.open(ErroreMessageComponent);
      modalRef.componentInstance.isMagnitText = true;
      setTimeout(() => {
        modalRef.dismiss();
      }, 2500);
      return;
    }
    this.frames.isImg = false;
    this.imgService.letterColorFone();
  }
  ngOnInit(): void { 
    this.myForm()
  }
}
