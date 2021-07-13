import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { Letter } from '../../../shared/img-ramka';
import { ImgCatalogComponent } from '../img-catalog/img-catalog.component';



@Component({
  selector: 'app-create-img',
  templateUrl: './create-img.component.html',
  styleUrls: ['./create-img.component.css']
})
export class CreateImgComponent implements OnInit {

  isCreate = true;
  bottomText: FormGroup = new FormGroup({});
  validateForm: FormGroup = new FormGroup({});

  topLettering: Letter = {
    isSpan: false,
    isMenu: false,
    isForm: false
  };

  bottomLettering: Letter = {
    isSpan: false,
    isMenu: false,
    isForm: false
  }

  @Output() mainApp: EventEmitter<boolean> = new EventEmitter();
  constructor(public frames: FramesServService, public rout: Router,
    private form: FormBuilder, private modalService: NgbModal) { }

  deleteTopProprty() {
    this.topLettering.isSpan = false;
    this.topLettering.isMenu = false;
    this.validateForm.reset();

  }

  deleteBottomProprty() {
    this.bottomLettering.isMenu = false;
    this.bottomLettering.isSpan = false;
    this.bottomText.reset();
  }

  onMouseleave() {
    if (!this.validateForm.get('topText')?.value) {
      this.topLettering.isMenu = false;
      this.topLettering.isForm = false;
    }

    if (!this.bottomText.get('btmText')?.value) {
      this.bottomLettering.isMenu = false;
      this.bottomLettering.isForm = false;
    }

    if (this.validateForm.get('topText')?.value) {
      this.frames.topText = this.validateForm.get('topText')?.value;
      this.topLettering.isSpan = true;
      this.topLettering.isMenu = false;
    }

    if (this.bottomText.get('btmText')?.value) {
      this.frames.btmText = this.bottomText.get('btmText')?.value;
      this.bottomLettering.isSpan = true;
      this.bottomLettering.isMenu = false;
    }

  }

  onMouseenter() {
    if (!this.validateForm.get('topText')?.value) {
      this.topLettering.isMenu = true;
      this.topLettering.isSpan = false;
      this.topLettering.isForm = true;
    }


    if (!this.bottomText.get('btmText')?.value) {
      this.bottomLettering.isMenu = true;
      this.bottomLettering.isForm = true;
      this.bottomLettering.isSpan = false;
    }

    if (this.validateForm.get('topText')?.value) {
      this.topLettering.isMenu = true;
    }

    if (this.bottomText.get('btmText')?.value) {
      this.bottomLettering.isMenu = true;
    }

  }

  changeImg() {
    this.frames.letterColorFone()
  }

  ngOnInit(): void {
    this.validateForm = this.form.group(
      { topText: [null] },
    );
    this.bottomText = this.form.group(
      { btmText: [null] }
    )
    this.frames.isMessage = false;
  }

  getApp(isBool: boolean) {
    this.mainApp.emit(isBool);
  }

  checkImage(img: string): boolean {
    return img.startsWith('http') ? true : false
  }


  open(img: any, num: number) {
    this.frames.letterColection(img.character.toUpperCase()).subscribe((el: any) => {
      const modalRef = this.modalService.open(ImgCatalogComponent, { size: 'lg' });
      modalRef.componentInstance.img = el.results;
      modalRef.componentInstance.character = this.frames.letterImges[num];
      modalRef.result.then((result) => { }, (reason) => {
        if (reason) {
          this.frames.letterImges[num].image = reason;

        }
      })
    })

  }

  myOrder() {
    const imgs: any[] = [];
    this.frames.letterImges.forEach((i, index) => {
      const obj = {
        order_index: index,
        character: i.image.character,
        image: i.image.id,
        user_image: null
      }
      imgs.push(obj)

    })

    const order = {
      frame: this.frames.frame.id,
      background: this.frames.background.id,
      word: this.frames.text.toUpperCase(),
      text_in_top: this.frames.topText,
      text_in_bottom: this.frames.btmText,
      images: imgs
    }
    
    this.frames.getOrder(order).subscribe((el:any)=>{
      this.frames.orderList = el;
    //  this.frames.letterImges;
      this.frames.isOrder = true;
    })
    
  }






}
