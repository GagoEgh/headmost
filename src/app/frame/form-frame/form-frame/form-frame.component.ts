import { FramesServService } from 'src/app/shared/frames-serv.service';
import { FrameImag } from 'src/app/shared/frame-image';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-frame',
  templateUrl: './form-frame.component.html',
  styleUrls: ['./form-frame.component.css']
})
export class FormFrameComponent extends FrameImag implements OnInit {
  constructor(public frames: FramesServService, private _translate: TranslateService, public modalService: NgbModal,
    public rout: Router, public form: FormBuilder,) {
    super(frames, modalService, rout, form);
    this._translate.use(this.frames.lang)
  }

  ngOnInit(): void {
  }

  // buttonWrapTop() {
  //   let top = {
  //     "top": '45px'
  //   }

  //   if (window.innerWidth <= 356) {
  //     top["top"] = '220px';
  //     return top;
  //   }

  //   if (window.innerWidth <= 375) {
  //     top["top"] = '190px';
  //     return top;
  //   }


  //   if (window.innerWidth <= 426) {
  //     top["top"] = '505px';
  //     return top;

  //   }

  //   if (window.innerWidth <= 768) {
  //     top["top"] = '205px';
  //     return top;

  //   }

  //   if (window.innerWidth <= 1024) {
  //     top["top"] = '114px';
  //     return top;

  //   }

  //   return top
  // }
}
