import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-imags',
  templateUrl: './user-imags.component.html',
  styleUrls: ['./user-imags.component.css']
})
export class UserImagsComponent implements OnInit,AfterViewChecked{
  public _subscribe$ = new Subject();
  throttle = 300;
  scrollDistance = 3;
  scrollUpDistance = 1;
  offset = 0;
  isSmsErr = false;
  msgErr_hy = '';
  constructor(private msg: NzMessageService, public frames: FramesServService,public _translate:TranslateService) { }

  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this._translate.get('_erroreMessage._imgErr').subscribe((res:any)=>{
      this.msgErr_hy = res
    })
  
  }



  ngOnInit(): void {
    this.offset = 0;
    this.frames.fileList = [];
    this.myImages();
  }

  myImages(){
   // this.frames.fileList = [];
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

  handleChange(info: NzUploadChangeParam): void {
    const origin: any = info.file.originFileObj;
    this.isSmsErr = false;
    if (info.type === 'progress') {
      const formData = new FormData();
      formData.append('user', this.frames.userData.user.toString())
      formData.append('image', origin);
      formData.append('thumb_image', origin);
      
      this.frames.userImage(formData).subscribe((el:any)=>{
        this.frames.fileList.unshift(el);
      })
    }
  }


  delete(id: number) {
    this.frames.deleteUserImage(id).pipe(takeUntil(this._subscribe$)).subscribe((el) => {
      this.frames.fileList = this.frames.fileList.filter((img: any) => {
        return img.id != id
      })
      this.isSmsErr = false;
    },((err:any)=>{
      if(err.status === 500){
        this.isSmsErr = true;
        this._translate.get('_erroreMessage._imgErr').subscribe((res:any)=>{
          this.msgErr_hy = res
        })
      }
    }))
  }

  ngOnDestroy(){
    this._subscribe$.next();
    this._subscribe$.complete();
  }
}
