import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FramesServService } from 'src/app/shared/frames-serv.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-user-imags',
  templateUrl: './user-imags.component.html',
  styleUrls: ['./user-imags.component.css']
})
export class UserImagsComponent implements OnInit {
  // NzUploadFile[] 
  fileList: NzUploadFile[]  = [
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
  ];

  previewImage: string | undefined = '';
  previewVisible = false;
  constructor(private frames: FramesServService) { }


  ngOnInit(): void {
   
  }

  files = []
  uploadFile(image: any) {
    if (image && image.type == 'success') {
      let originFileObj = image.file.originFileObj
      const formData = new FormData();

      formData.append('image', originFileObj);
      formData.append('thumb_image', originFileObj);
      formData.append('user', this.frames.userData.user.toString())
      this.frames.userImage(formData).subscribe((el: any) => {
        // this.frames.fileUrl = el;
      })


      this.frames.userImageGet().subscribe((el:any)=>{
        console.log('el',el.results);
        this.files = el.results;
        this.files.forEach((img:any)=>{
        // console.log('img',img)
        })
      })
    }

  }


  handlePreview = async (file: any) => {
    
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
      console.log('file',file.pre)
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  
  };

  
}
