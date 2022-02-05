import { UserImagsComponent } from './user-imags.component';
import { SharedModule } from 'src/app/shared/shared.modult';
import { HttpClientJsonpModule } from '@angular/common/http';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule, Routes } from '@angular/router';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { registerLocaleData } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
registerLocaleData(en)


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


const routes:Routes = [
  {path:'',component:UserImagsComponent}
]


@NgModule({
  declarations: [
    UserImagsComponent
  ],
  imports: [
    SharedModule,
    NzUploadModule,
    RouterModule.forChild(routes),
    HttpClientJsonpModule,
    ScrollingModule,
    DragDropModule,
    NzMessageModule,
    NzModalModule,
    InfiniteScrollModule
  ],

  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }]
})
export class UserImagsModule { }
