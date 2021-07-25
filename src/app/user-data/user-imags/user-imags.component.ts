import {  Component,  OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { FramesServService } from 'src/app/shared/frames-serv.service';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-user-imags',
  templateUrl: './user-imags.component.html',
  styleUrls: ['./user-imags.component.css']
})
export class UserImagsComponent implements OnInit {
  fileList: any = [];

  constructor(private msg: NzMessageService, public frames: FramesServService) { }

 

  ngOnInit(): void {
    this.frames.userImageGet().subscribe((el:any)=>{
      this.fileList = el.results;
     console.log('oninit',this.fileList)
    })
    
  }

  handleChange(info: NzUploadChangeParam): void {
    const origin: any = info.file.originFileObj;
    if (info.type === 'progress') {
      const formData = new FormData();
      formData.append('user', this.frames.userData.user.toString())
      formData.append('image', origin);
      formData.append('thumb_image', origin);

      this.frames.userImage(formData).pipe(switchMap((val: any) => {
        return this.frames.userImageGet()

      })).subscribe((el: any) => {
        this.fileList = el.results;
        console.log('list', this.fileList);
      })
    }
  }

  delete(id:number){
    this.frames.deleteUserImage(id).subscribe((el)=>{
      this.fileList = this.fileList.filter((img:any)=>{
       return img.id!=id
      });
      console.log(this.fileList);
     
    })
  }

}
