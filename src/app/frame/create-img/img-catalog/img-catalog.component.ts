import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoUsserComponent } from '../no-usser/no-usser.component';
import { ServerResponce } from 'src/app/modules/img-ramka.module';
import { CategoryDetails } from 'src/app/modules/CategoryDetails.module';
import { ImageResponse, ImgColorValue, UserImage } from 'src/app/modules/ImageResponse.module';
import { WordResult } from 'src/app/modules/WordResult.module';
import { TranslateService } from "@ngx-translate/core";
import { ImgCatalogService } from './img-catalog.service';
import { FrameImageService } from 'src/app/frame-image/frame-image.service';



@Component({
  selector: 'app-img-catalog',
  templateUrl: './img-catalog.component.html',
  styleUrls: ['./img-catalog.component.css'],
})
export class ImgCatalogComponent implements OnInit {
  private _subscribe$ = new Subject();
  public img: ImageResponse[] = []
  public character = {} as WordResult;
  @Output() newItem = new EventEmitter();
  @ViewChild("header", { static: false }) block: ElementRef | undefined;
  public categoryList: CategoryDetails[] = [];
  constructor(public activeModal: NgbActiveModal, public _translate: TranslateService,
    public imgService: FrameImageService, public imgCatalogService: ImgCatalogService, public frames: FramesServService, public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.frames.apiPhoto = true;
    this.imgService.painding.imgs = this.img;
    this.createCategory();
  }


  private chengePopapImg(): void {
    this.frames.letterColection(this.character.character.toUpperCase(), this.imgService.painding.id)
      .subscribe((imageResponse: ServerResponce<ImageResponse[]>) => {
        this.imgService.painding.imgs = imageResponse.results;
      })
  }

  public changeImg(image: ImageResponse): void {
    this.imgService.painding.imgs = [];
    this.activeModal.dismiss(image);
  }

  public showMyPhoto(img: object): void {
    this.activeModal.dismiss(img);
  }

  public changeFone(imgColor: { ceys: CategoryDetails, values: ImgColorValue }): void {
    this.imgService.painding.values = imgColor.values;
    this.imgService.painding.id = imgColor.ceys.id;
    this.frames.apiPhoto = true
    this.chengePopapImg();
  }

  private createCategory(): void {
    this.imgCatalogService.getCategory().pipe(takeUntil(this._subscribe$)).subscribe((categoryDetails: ServerResponce<CategoryDetails[]>) => {
      this.categoryList = categoryDetails.results;
    })
  }

  public showCategory(category: CategoryDetails): void {
    this.frames.letterColection(this.character.character.toUpperCase(), this.imgService.painding.id, category.id)
      .subscribe((imageResponse: ServerResponce<ImageResponse[]>) => {
        this.imgService.painding.imgs = imageResponse.results
        this.imgService.painding.categoryId = category.id;
        this.frames.apiPhoto = true;
      })

  }

  public getMyPhoto(): void {
    if (localStorage.getItem('loginAutorization')) {
      this.frames.userImageGet(0).pipe(takeUntil(this._subscribe$))
      .subscribe((userImage: ServerResponce<UserImage[]>) => {
        this.frames.fileList = userImage.results;
        this.frames.apiPhoto = false;
      })

    } else {
      const modalRef = this.modalService.open(NoUsserComponent);
      setTimeout(() => {
        modalRef.dismiss()
      }, 1000)
    }
  }

  ngOnDestroy(): void {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
