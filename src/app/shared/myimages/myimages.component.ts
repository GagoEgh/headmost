import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponce } from 'src/app/modules/img-ramka.module';
import { UserImage } from 'src/app/modules/ImageResponse.module';
import { UserImagsService } from 'src/app/user-data/user-imags/user-imags.service';
import { FramesServService } from '../frames-serv.service';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../components/modal/modal.component';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-myimages',
  templateUrl: './myimages.component.html',
  styleUrls: ['./myimages.component.css']
})
export class MyimagesComponent implements OnInit {

  public _subscribe$ = new Subject();
  public scrollUpDistance = 1;
  public scrollDistance = 3;
  public isSmsErr = false;
  public throttle = 300;
  public msgErr_hy: string = '';
  public offset = 0;
  public count!: number;
  constructor(private msg: NzMessageService, public frames: FramesServService,
    public userImagsServicw: UserImagsService, private spinner: NgxSpinnerService, public _translate: TranslateService,
    public matDialog: MatDialog) { }


  ngAfterViewChecked(): void {
    this._translate.use(this.frames.lang);
    this._translate.get('ErroreMessage.imgErr').subscribe((erroreMessage: string) => {
      this.msgErr_hy = erroreMessage
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
    let files: File = ev.target?.files[0];
    if (!ev.target.files?.length) return
    if (!files.type.match('image')) return
    const formData = new FormData();
    formData.append('user', this.frames.userData.user.toString())
    formData.append('image', files);
    formData.append('thumb_image', files);
    this.spinner.show();
    this.userImagsServicw.userImage(formData).subscribe(
      (userImage: UserImage) => {
        this.frames.fileList.unshift(userImage);
        if(this.count === this.frames.fileList.length -1 ){
          this.count = this.frames.fileList.length;
       }
        this.spinner.hide();
      })
  }

  public myImages(): void {
    this.spinner.show();
    this.frames.userImageGet(this.offset)
      .pipe(takeUntil(this._subscribe$))
      .subscribe((usImg: ServerResponce<UserImage[]>) => {
        this.isSmsErr = false;
        this.count = usImg.count;
        this.frames.fileList.push(...usImg.results);
        this.offset += 10;
        this.spinner.hide();
      })
  }

  public delete(id: number): void {
    this.spinner.show();
    this.userImagsServicw.deleteUserImage(id)
      .pipe(takeUntil(this._subscribe$))
      .subscribe(() => {
        this.frames.fileList = this.frames.fileList.filter((img: any) => {
          return img.id != id
        })
        
        if(this.count === this.frames.fileList.length +1){
           this.count = this.frames.fileList.length;
        }
        
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

  openDialog(id: number) {
    const dialogRef = this.matDialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        return this.delete(id)
      }
    });
  }

  ngOnDestroy(): void {
    this._subscribe$.next();
    this._subscribe$.complete();
  }

}
