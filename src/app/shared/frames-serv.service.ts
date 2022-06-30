import { LoginComponent } from '../register/login/login.component';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Api, CountryResult, ServerResponce } from '../modeles/img-ramka.modele';
import { CardItemResults } from '../modeles/frame-response.modele';
import { ImageResponse, ImgColorValue, UserImage } from '../modeles/ImageResponse.modele';
import { CategoryDetails } from '../modeles/CategoryDetails.modele';
import { UserData } from '../modeles/UserInfo.module';
import { WordResult } from '../modeles/WordResult.module';



@Injectable({
    providedIn: 'root'
})
export class FramesServService {
    public orderSubject = new BehaviorSubject(null);
    public frameHeigth = {} as { [key: string]: string };
    public validateForm!: FormGroup ;
    public userData!: UserData;
    public letterImges!: WordResult[];
    public selectedValue!: any [];
    public placeholder = '';
    public lang = 'ru';
    public country_placeholder = '';
    public isOrder: boolean = false;
    public isSilki = false;
    public orderList!: CardItemResults[];
    public background: any = {};
    public topText: string = '';
    public btmText: string = '';
    public text: string = '';
    public index: number = 3;
    public sum: number = 0;
    public userReg = true;
    public apiPhoto = true;
    public fileList: any = [];
    public token: string = '';
    public isMyOrder = false;
    public limit = 10;
    public offset = 0;
    public isTop = false;
    public urlArr: string[] = [];
    public letterChar: string = '';
    public isImg = true;
    public frame: any;
    public isGet:boolean = false;
    // userdetails/change-password/
    public api: Api = {
        worldApi: 'https://admin.gift4u.am',
        api_utils: '/utils',
        api_bgr: '/background/',
        api_frame: '/frame/',
        api_color: '/color/',
        api_category: '/category/',
        api_character: '/character/',
        api_created_frame_category: '/created-frame-category/',
        api_promocode: '/promocode/',
        api_img: '/image',
        api_create_word: '/create-word/',
        api_order: '/order',
        api_card: '/card-item',
        api_add: '/add-frame-in-card/',
        api_location: '/location',
        api_country: '/country/',
        api_check_promo: 'check-promo-code/',
        api_userdetails: '/userdetails/',
        api_register: 'register/',
        api_shipping: 'shipping-method/',
        api_login: 'login/',
        api_edit: 'edit-user-details/',
        api_files: '/files',
        api_user_image: '/user-image',
        api_created_frame: '/created-frame',
        api_magnet: '/add-magnet-in-card',
        api_languages: '/static/languages',
        api_changePass:'change-password/',
        api_en: '/en.json',
        api_ru: '/ru.json',
        api_hy: '/hy.json'
    }

    public imgColor: { ceys: CategoryDetails, values: ImgColorValue }[] = [
        {
            ceys: {} as CategoryDetails,
            values:
            {
                colored: false,
                withandblack: true,
                sepia: false,
                color: 'black',
                child: 'white',
            }

        }, {
            ceys: {} as CategoryDetails,
            values:
            {
                colored: true,
                withandblack: false,
                sepia: false,
                color: 'red',
                child: 'palevioletred',
            }
        }, {
            ceys: {} as CategoryDetails,
            values:
            {
                colored: false,
                withandblack: false,
                sepia: true,
                color: 'grey',
                child: 'grey',
            }
        }
    ];

    constructor(private url: HttpClient, public spinner: NgxSpinnerService, public rout: Router,
        public _translate: TranslateService, public modalService: NgbModal) { }


    setOrdersDate(data:any){
        this.orderSubject.next(data)
    }

    getOrdersDate(){
        return this.orderSubject.asObservable()
    }

    public letterColection(search: string = '', color: string | number = '', category: number | string = ''): Observable<ServerResponce<ImageResponse[]>> {
        return this.url.get<ServerResponce<ImageResponse[]>>(this.api.worldApi + this.api.api_img + this.api.api_img + '/?color=' + `${color}` + '&category=' + `${category}` + '&search=' + `${search}` + '&limit=1000')
    }

    private getOrder(obj: any): Observable<CardItemResults[]> {
        return this.url.post<CardItemResults[]>(this.api.worldApi + this.api.api_order + this.api.api_card + this.api.api_add,
            obj
        )
    }

    public getCountry(): Observable<ServerResponce<CountryResult[]>> {
        return this.url.get<ServerResponce<CountryResult[]>>(this.api.worldApi + this.api.api_location + this.api.api_country)
    }

    public userInfo(): Observable<ServerResponce<[]>> {
        return this.url.get<ServerResponce<[]>>(this.api.worldApi + this.api.api_order + this.api.api_card + '/?user=' + `${this.userData.user}`)
    }

    public userImageGet(myImgOffset: number): Observable<ServerResponce<UserImage[]>> {
        return this.url.get<ServerResponce<UserImage[]>>(this.api.worldApi + this.api.api_img + this.api.api_user_image + '/?user=' + `${this.userData.user}&limit=10&offset=${myImgOffset}`)
    }

    public userCountry() {
      return  this.getCountry()
    }

    public orderCard(obj: { created_frame: string, user: number }): Observable<CardItemResults> {
        return this.url.post<CardItemResults>(this.api.worldApi + this.api.api_order + this.api.api_card + '/', obj)
    }

    public cityPlaceholder(){
       return this._translate.get('Order.userData.countryPlaceholder')
    }

   
    public getUserOrder(id:number) {
        return this.url.get(this.api.worldApi + this.api.api_order + this.api.api_card+ `/?user=${id}&limit=1000`)
    }
    
    public showFrame(): void {
        this.isOrder = false;
        this.isImg = true;
        this.validateForm.reset();
        if (this.urlArr[1] === 'frame') {
            this.rout.navigate([this.urlArr[1] + '/form-frame']);
        }
        if (this.urlArr[1] === 'magnit') {
            this.rout.navigate([this.urlArr[1] + '/form-magnit'])
        }
    }

    public myOrder() {
        if (localStorage.getItem('loginAutorization')) {
            this.spinner.show();
            this.isTop = true;
            const imgs: any[] = [];
            this.letterImges.forEach((i, index) => {
                const obj = {
                    order_index: index,
                    character: i.image.character,
                    image: i.image.id,
                    user_image: null,
                }
                imgs.push(obj)
            })

            const order = {
                frame: this.frame.id,
                background: this.background.id,
                word: this.text.toUpperCase(),
                text_in_top: this.topText,
                text_in_bottom: this.btmText,
                images: imgs,
            }

            if (!this.apiPhoto) {
                order.images = order.images.map((img: any) => {
                    if (img.character === undefined) {
                        img.character = this.letterChar;
                        img.user_image = img.image;
                        img.image = null;
                    }
                    return img;
                })
            }

            this.getOrder(order)
                .subscribe((orderList: CardItemResults[]) => {
                    this.orderList = orderList.reverse();
                    this.isOrder = true;
                    this.spinner.hide()
                })
        } else {
            const modalRef = this.modalService.open(LoginComponent);

        }

    }

    public conteinerHeight(): void {
        let height = {
            height: '650px'
        }

        if (window.innerWidth <= 769) {
            height.height = '400px';
            this.frameHeigth = height
        }

        if (this.isOrder && window.innerWidth <= 2000) {
            height.height = '1500px';
            if (this.isOrder && window.innerWidth <= 1290) {
                height.height = '1600px';
                this.frameHeigth = height;
            }

            if (this.isOrder && window.innerWidth <= 769) {
                height.height = '1305px';
                this.frameHeigth = height
            }

            this.frameHeigth = height;
        }

        this.frameHeigth = height
    }
}
