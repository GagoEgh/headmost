import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoUsserComponent } from '../no-usser/no-usser.component';
import { ImgColorValue, ServerResponce, UserImage } from 'src/app/interface/img-ramka';
import { CategoryDetails } from 'src/app/interface/CategoryDetails';
import { ImageResponse } from 'src/app/interface/ImageResponse';
import { WordResult } from 'src/app/interface/WordResult';


@Component({
  selector: 'app-img-catalog',
  templateUrl: './img-catalog.component.html',
  styleUrls: ['./img-catalog.component.css']
})
export class ImgCatalogComponent implements OnInit {
  public _subscribe$ = new Subject();
  public img: ImageResponse[] = []
  public character = new WordResult()
  @Output() newItem = new EventEmitter();
  @ViewChild("header", { static: false }) block: ElementRef | undefined;
  public categoryList: CategoryDetails[] = [];
  constructor(public activeModal: NgbActiveModal, public frames: FramesServService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.frames.painding.imgs = this.img;
    this.createCategory();
  }

  private chengePopapImg(): void {
    this.frames.letterColection(this.character.character.toUpperCase(), this.frames.painding.id)
      .subscribe((imageResponse: ServerResponce<ImageResponse[]>) => {
        this.frames.painding.imgs = imageResponse.results;
      })
  }

  public changeImg(image:  ImageResponse): void {
    this.frames.painding.imgs = [];
    this.activeModal.dismiss(image);
  }

 
  public showMyPhoto(img: object): void {
    this.activeModal.dismiss(img);
  }

  public changeFone(imgColor:{ ceys: CategoryDetails, values:ImgColorValue  } ): void {
    this.frames.painding.values = imgColor.values;
    this.frames.painding.id = imgColor.ceys.id;
    this.frames.apiPhoto = true
    this.chengePopapImg();
  }

  private createCategory(): void {
    this.frames.getCategory().pipe(takeUntil(this._subscribe$)).subscribe((categoryDetails: ServerResponce<CategoryDetails[]>) => {
      this.categoryList = categoryDetails.results;
    })
  }

  public showCategory(category:CategoryDetails): void {
    this.frames.letterColection(this.character.character.toUpperCase(), this.frames.painding.id, category.id)
      .subscribe((imageResponse: ServerResponce<ImageResponse[]>) => {
        this.frames.painding.imgs = imageResponse.results
        this.frames.painding.categoryId = category.id;
        this.frames.apiPhoto = true;
      })
  }

  public getMyPhoto(): void {
    if (localStorage.getItem('loginAutorization')) {
      this.frames.userImageGet(0).pipe(takeUntil(this._subscribe$)).subscribe((userImage: ServerResponce<UserImage[]>) => {
        this.frames.fileList = userImage.results;
        this.frames.apiPhoto = false;
      })

    } else {
      const modalRef = this.modalService.open(NoUsserComponent);
      setTimeout(() => {
        modalRef.dismiss()
      }, 2500)
    }
  }

  public ngOnDestroy(): void {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
