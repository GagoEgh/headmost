import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { LoginComponent } from 'src/app/register/login/login.component';
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

  myMagnitOrder() {
    if (localStorage.getItem('loginAutorization')) {
      this.frames.spinner.show();
      this.frames.isTop = true;
      const imgs: any[] = [];
      this.frames.letterImges.forEach((i, index) => {
        const obj = {
          order_index: index,
          character: i.image.character,
          image: i.image.id,
          user_image: null,
        }
        imgs.push(obj)
      })

      const order = {
        word: this.frames.text.toUpperCase(),
        images: imgs,
      }

      if (!this.frames.apiPhoto) {
        order.images = order.images.map((img: any) => {
          if (img.character === undefined) {
            img.character = this.letterChar;
            img.user_image = img.image;
            img.image = null;
          }
          return img;
        })
      }

      this.frames.magnetImg(order).pipe(takeUntil(this._unsubscribe$)).subscribe((el: any) => {
        this.frames.orderList = el;
        this.frames.isOrder = true;
        this.frames.spinner.hide()
      })
    } else {
      const modalRef = this.modalService.open(LoginComponent);

    }

  }
}

