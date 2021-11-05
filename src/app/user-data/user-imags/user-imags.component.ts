import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponce, UserImage } from 'src/app/interface/img-ramka';



@Component({
  selector: 'app-user-imags',
  templateUrl: './user-imags.component.html',
  styleUrls: ['./user-imags.component.css']
})
export class UserImagsComponent implements OnInit, AfterViewChecked {
  public _subscribe$ = new Subject();
  public scrollUpDistance = 1;
  public scrollDistance = 3;
  public isSmsErr = false;
  public throttle = 300;
  public msgErr_hy = '';
  public offset = 0;
  constructor(private msg: NzMessageService, public frames: FramesServService,
    private spinner: NgxSpinnerService, public _translate: TranslateService) { }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this._translate.get('ErroreMessage.imgErr').subscribe((res: any) => {
      this.msgErr_hy = res
    })

  }

  ngOnInit(): void {
    this.offset = 0;
    this.frames.fileList = [];
    this.myImages();
  }

  public trigger(file: any): void {
    file.click()
  }

  public hendler(ev: any): void {
    let files: any = ev.target.files[0];
    if (!ev.target.files.length) return
    if (!files.type.match('image')) return

    const formData = new FormData();
    formData.append('user', this.frames.userData.user.toString())
    formData.append('image', files);
    formData.append('thumb_image', files);
    this.spinner.show();
    this.frames.userImage(formData).subscribe((userImage: UserImage) => {
      this.frames.fileList.unshift(userImage);
      this.spinner.hide();
    })
  }

  private myImages(): void {
    this.frames.userImageGet(this.offset).pipe(takeUntil(this._subscribe$)).subscribe((usImg: ServerResponce<UserImage[]>) => {
      this.isSmsErr = false;
      this.frames.fileList.push(...usImg.results);
      this.offset += 10;
    })
  }

  public onScrollDown(ev: any): void {
    this.offset = this.frames.fileList.length;
    this.isSmsErr = false;
    this.myImages()
  }

  public delete(id: number): void {
    this.spinner.show();
    this.frames.deleteUserImage(id).pipe(takeUntil(this._subscribe$)).subscribe(() => {
      this.frames.fileList = this.frames.fileList.filter((img: any) => {
        return img.id != id
      })
      this.isSmsErr = false;
      this.spinner.hide();
    }, ((err: HttpErrorResponse) => {
      if (err.status === 500) {
        this.isSmsErr = true;
        this._translate.get('ErroreMessage.imgErr').subscribe((res: any) => {
          this.msgErr_hy = res;
          this.spinner.hide();
        })
      }
    }))
  }

  private ngOnDestroy(): void {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
