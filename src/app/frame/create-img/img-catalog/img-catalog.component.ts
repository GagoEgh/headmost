import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/shared/img-ramka';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoUsserComponent } from '../no-usser/no-usser.component';

@Component({
  selector: 'app-img-catalog',
  templateUrl: './img-catalog.component.html',
  styleUrls: ['./img-catalog.component.css']
})
export class ImgCatalogComponent implements OnInit {
  public _subscribe$ = new Subject();
  @Input() img: any;
  @Input() character: any;
  categoryList: Category[] = [];
  @Output() newItem = new EventEmitter();
  @ViewChild("header", { static: false }) block: ElementRef | undefined;
  constructor(public activeModal: NgbActiveModal, public frames: FramesServService,public modalService: NgbModal) { }

  ngOnInit(): void {
    this.frames.painding.imgs = this.img;
    this.createCategory();
  }

  chengePopapImg() {
    this.frames.letterColection(this.character.character.toUpperCase(), this.frames.painding.id)
      .subscribe((el: any) => {
        this.frames.painding.imgs = el.results;
      })
  }

  changeImg(obj: any) {
    this.frames.painding.imgs = [];
    this.activeModal.dismiss(obj);
  }

  showMyPhoto(img:any){
    this.activeModal.dismiss(img);
  }

  changeFone(obj: any) {
    this.frames.painding.values = obj.values;
    this.frames.painding.id = obj.ceys.id;
    this.frames.apiPhoto = true
    this.chengePopapImg();
  }

  createCategory() {
    this.frames.getCategory().pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.categoryList = el.results;
    })
  }

  showCategory(category: any) {
    this.frames.letterColection(this.character.character.toUpperCase(), this.frames.painding.id,category.id)
    .subscribe((el:any)=>{
      this.frames.painding.imgs = el.results
      this.frames.painding.categoryId = category.id;
      this.frames.apiPhoto = true;
    })
  }

  getMyPhoto(){
    if(localStorage.getItem('loginAutorization')){
      this.frames.userImageGet(0).pipe(takeUntil(this._subscribe$)).subscribe((el:any)=>{
        this.frames.fileList = el.results;
        this.frames.apiPhoto = false;
      })
    }else{
      const modalRef = this.modalService.open(NoUsserComponent);
      setTimeout(()=>{
        modalRef.dismiss()
      },2500)
    }
  }

  ngOnDestroy(){
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
