import { FramesServService } from 'src/app/shared/frames-serv.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-user-imags',
  templateUrl: './user-imags.component.html',
  styleUrls: ['./user-imags.component.css']
})
export class UserImagsComponent implements OnInit, AfterViewChecked {
  public _subscribe$ = new Subject();
  scrollUpDistance = 1;
  scrollDistance = 3;
  isSmsErr = false;
  throttle = 300;
  msgErr_hy = '';
  offset = 0;
  constructor(private msg: NzMessageService, public frames: FramesServService,
    private spinner: NgxSpinnerService, public _translate: TranslateService) { }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this._translate.get('_erroreMessage._imgErr').subscribe((res: any) => {
      this.msgErr_hy = res
    })

  }

  ngOnInit(): void {

    this.offset = 0;
    this.frames.fileList = [];
    this.myImages();
  }

  trigger(file: any) {
    file.click()
  }

  hendler(ev: any) {
    let files: any = ev.target.files[0];
    if (!ev.target.files.length) return
    if (!files.type.match('image')) return

    const formData = new FormData();
    formData.append('user', this.frames.userData.user.toString())
    formData.append('image', files);
    formData.append('thumb_image', files);
    this.spinner.show();
    this.frames.userImage(formData).subscribe((el: any) => {
      this.frames.fileList.unshift(el);
      this.spinner.hide();
    })
  }

  myImages() {
    this.frames.userImageGet(this.offset).pipe(takeUntil(this._subscribe$)).subscribe((el: any) => {
      this.isSmsErr = false;
      this.frames.fileList.push(...el.results);
      this.offset += 10;
    })
  }

  onScrollDown(ev: any) {
    this.offset = this.frames.fileList.length;
    this.isSmsErr = false;
    this.myImages()
  }

  delete(id: number) {
    this.spinner.show();
    this.frames.deleteUserImage(id).pipe(takeUntil(this._subscribe$)).subscribe((el) => {
      this.frames.fileList = this.frames.fileList.filter((img: any) => {
        return img.id != id
      })
      this.isSmsErr = false;
      this.spinner.hide();
    }, ((err: any) => {
      if (err.status === 500) {
        this.isSmsErr = true;
        this._translate.get('_erroreMessage._imgErr').subscribe((res: any) => {
          this.msgErr_hy = res;
          this.spinner.hide();
        })
      }
    }))
  }

  ngOnDestroy() {
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
