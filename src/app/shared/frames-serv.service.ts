import { LoginComponent } from '../register/login/login.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Api, BgDetails, CountryResult, FramesImg, ImgColorValue, Painding, PromoCodeResults, ServerResponce, UserImage} from '../interface/img-ramka';
import { CardItemResults, FrameDetalis, FrameResults } from '../interface/frame-response';
import { Edit, RegisterResult, UserDetalis } from '../interface/register-response';
import { OrderResult, ShipingResult } from '../interface/order-response';
import { UserData } from '../interface/UserAllData';
import { ImageResponse } from '../interface/ImageResponse';
import { CategoryDetails } from '../interface/CategoryDetails';
import { WordResult } from '../interface/WordResult';

@Injectable({
    providedIn: 'root'
})
export class FramesServService {
    public validateForm: FormGroup = new FormGroup({});
    public userData: UserData = new UserData();
    public letterImges: WordResult[] = []
    public framesImge: FramesImg[] = [];
    public selectedValue: any[] = [];
    public placeholder = '';
    public lang = 'en';
    public country_placeholder = '';
    private fileUrl = {};
    public isOrder: boolean = false;
    public isSilki = false;
    public orderList: CardItemResults[] = [];
    private orderListClone: CardItemResults[] = [];
    public background: any = {};
    public ideaImg: any = {};
    public topText: string = '';
    public btmText: string = '';
    public isRegister = false;
    public isLogin = false;
    private text: string = '';
    public isMessage = false;
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
    public isdisible = false;
    public scale: number = 1;
    private urlArr: string[] = [];
    public magnit_scale: number = 1;
    public letterChar = 0;
    public isImg = true;
    public div: any = [];
    public frame: any;


    public api: Api = {
        worldApi: 'http://sirun-bar-api.annaniks.com',
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
        api_magnet: '/add-magnet-in-card'
    }


    public painding: Painding = {
        values: {
            colored: false,
            withandblack: true,
            sepia: false,
            color: 'black',
            child: 'white',
        },
        imgs: [],
        id: 3,
        categoryId: 1
    };


    public imgColor: { ceys: CategoryDetails, values:ImgColorValue  }[] = [
        {
            ceys: new CategoryDetails(),
            values:
            {
                colored: false,
                withandblack: true,
                sepia: false,
                color: 'black',
                child: 'white',
            }

        }, {
            ceys: new CategoryDetails(),
            values:
            {
                colored: true,
                withandblack: false,
                sepia: false,
                color: 'red',
                child: 'palevioletred',
            }
        }, {
            ceys: new CategoryDetails(),
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

    public imgColorGet(): Observable<ServerResponce<CategoryDetails[]>> {
        return this.url.get<ServerResponce<CategoryDetails[]>>(this.api.worldApi + this.api.api_utils + this.api.api_color)
    }

    public framesFoneGet(): Observable<ServerResponce<BgDetails[]>> {
        return this.url.get<ServerResponce<BgDetails[]>>(this.api.worldApi + this.api.api_utils + this.api.api_bgr)
    }

    public getFrames(): Observable<ServerResponce<FramesImg[]>> {
        return this.url.get<ServerResponce<FramesImg[]>>(this.api.worldApi + this.api.api_utils + this.api.api_frame)
    }

    private letterGet(): Observable<WordResult[]> {
        let text = this.text ? this.text : null;
        return this.url.get<WordResult[]>(this.api.worldApi + this.api.api_img + this.api.api_create_word + text + '/', {
            params: new HttpParams().set('color', this.painding.id.toString())
        });
    }

    public letterColection(search: string = '', color: string | number = '', category: number|string = ''): Observable<ServerResponce<ImageResponse[]>> {
        return this.url.get<ServerResponce<ImageResponse[]>>(this.api.worldApi + this.api.api_img + this.api.api_img + '/?color=' + `${color}` + '&category=' + `${category}` + '&search=' + `${search}` + '&limit=1000')
    }

    public getCategory(): Observable<ServerResponce<CategoryDetails[]>> {
        return this.url.get<ServerResponce<CategoryDetails[]>>(this.api.worldApi + this.api.api_utils + this.api.api_category)
    }

    private getOrder(obj: any): Observable<CardItemResults[]> {
        return this.url.post<CardItemResults[]>(this.api.worldApi + this.api.api_order + this.api.api_card + this.api.api_add,
            obj,
            { headers: { 'Authorization': this.token } }
        )
    }

    public getCountry(): Observable<ServerResponce<CountryResult[]>> {
        return this.url.get<ServerResponce<CountryResult[]>>(this.api.worldApi + this.api.api_location + this.api.api_country)
    }

    public userOrderDel(id: number): Observable<{ message: string }> {
        return this.url.get<{ message: string }>(this.api.worldApi + this.api.api_order + this.api.api_order + '/' + id + '/hide/',
            { headers: { 'Authorization': this.token } })
    }

    public deleteOrder(id: number): Observable<null> {
        return this.url.delete<null>(this.api.worldApi + this.api.api_order + this.api.api_card + '/' + id + '/',
            { headers: { 'Authorization': this.token } }
        )
    }

    public promoCodePost(data: { price: number, code: string }): Observable<PromoCodeResults> {
        return this.url.post<PromoCodeResults>(this.api.worldApi + this.api.api_utils + this.api.api_promocode + this.api.api_check_promo, data)
    }

    public userRegisterPost(obj: any): Observable<RegisterResult> {
        return this.url.post<RegisterResult>(this.api.worldApi + this.api.api_userdetails + this.api.api_register, obj)
    }

    public shipingMethod(): Observable<ServerResponce<ShipingResult[]>> {
        return this.url.get<ServerResponce<ShipingResult[]>>(this.api.worldApi + this.api.api_utils + '/' + this.api.api_shipping)
    }

    public userOrder(obj: OrderResult): Observable<ServerResponce<OrderResult[]>> {
        return this.url.post<ServerResponce<OrderResult[]>>(this.api.worldApi + this.api.api_order + this.api.api_order + '/', obj,
            { headers: { 'Authorization': this.token } })
    }

    public userLogin(obj: { username: string, password: number }): Observable<RegisterResult> {
        return this.url.post<RegisterResult>(this.api.worldApi + this.api.api_userdetails + this.api.api_login, obj,)
    }

    public editUser(obj: Edit): Observable<UserDetalis> {
        return this.url.put<UserDetalis>(this.api.worldApi + this.api.api_userdetails + this.api.api_edit, obj,
            { headers: { 'Authorization': this.token } })
    }

    public userInfo(): Observable<ServerResponce<[]>> {
        return this.url.get<ServerResponce<[]>>(this.api.worldApi + this.api.api_order + this.api.api_card + '/?user=' + `${this.userData.user}`,
            { headers: { 'Authorization': this.token } })
    }

    public userImage(obj: FormData): Observable<UserImage> {
        return this.url.post<UserImage>(this.api.worldApi + this.api.api_img + this.api.api_user_image + '/', obj,
            { headers: { 'Authorization': this.token } })
    }

    public userImageGet(myImgOffset: number): Observable<ServerResponce<UserImage[]>> {
        return this.url.get<ServerResponce<UserImage[]>>(this.api.worldApi + this.api.api_img + this.api.api_user_image + '/?user=' + `${this.userData.user}&limit=10&offset=${myImgOffset}`,
            { headers: { 'Authorization': this.token } })
    }

    public userCountry(): void {
        this.getCountry().subscribe((countryResult: ServerResponce<CountryResult[]>) => {
            this.selectedValue = countryResult.results
        })
    }

    public deleteUserImage(id: number): Observable<null> {
        return this.url.delete<null>(this.api.worldApi + this.api.api_img + this.api.api_user_image + `/${id}/`,
            { headers: { 'Authorization': this.token } })
    }

    public userOrderGet(): Observable<ServerResponce<OrderResult[]>> {
        return this.url.get<ServerResponce<OrderResult[]>>(this.api.worldApi + this.api.api_order + this.api.api_order + '/?user=' + `${this.limit}&offset=${this.offset}&user=${this.userData.user}`,
            { headers: { 'Authorization': this.token } })
    }

    public orderCard(obj: { created_frame: string, user: number }): Observable<CardItemResults> {
        return this.url.post<CardItemResults>(this.api.worldApi + this.api.api_order + this.api.api_card + '/', obj,
            { headers: { 'Authorization': this.token } })
    }

    public frameCategory(): Observable<ServerResponce<CategoryDetails[]>> {
        return this.url.get<ServerResponce<CategoryDetails[]>>(this.api.worldApi + this.api.api_utils + this.api.api_created_frame_category)
    }

    public frameCategoryImg(category: string, predifined: number, offset: number): Observable<ServerResponce<FrameDetalis[]>> {
        return this.url.get<ServerResponce<FrameDetalis[]>>(this.api.worldApi + this.api.api_img + this.api.api_created_frame + `/?created_frame_category=${category}&is_predefined=${predifined}&limit=50&offset=${offset}`)
    }

    public imgCategory(id: number): Observable<FrameDetalis> {
        return this.url.get<FrameDetalis>(this.api.worldApi + this.api.api_img + this.api.api_created_frame + `/${id}/`)
    }

    private magnetImg(obj: any): Observable<CardItemResults[]> {
        return this.url.post<CardItemResults[]>(this.api.worldApi + this.api.api_order + this.api.api_card + this.api.api_magnet + '/', obj,
            { headers: { 'Authorization': this.token } })
    }

    public cityPlaceholder(): void {
        this._translate.get('Order.userData.countryPlaceholder').subscribe((city: string) => {
            this.country_placeholder = city;
        })
    }

    public letterColorFone(): void {
        this.spinner.show();
        this.text = this.validateForm.get('text')?.value;

        this.letterGet().subscribe((wordResult: WordResult[]) => {
            this.letterImges = wordResult;
            this.letterImges = this.letterImges.filter(img => {
                return !img.not_found
            })
            console.log('letterImges ',this.letterImges)
            this.urlArr = this.rout.url.split('/');

            if (this.urlArr[1] === 'frame') {
                this.rout.navigate([this.urlArr[1] + '/create-img'], { queryParams: { type: this.urlArr[1], text: this.text } })
            }

            if (this.urlArr[1] === 'magnit') {
                this.rout.navigate([this.urlArr[1] + '/create-magnit'], { queryParams: { type: this.urlArr[1], text: this.text } })
            }

            setTimeout(() => {
                this.spinner.hide();
            }, 1000)

        })
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

            this.getOrder(order).subscribe((orderList: CardItemResults[]) => {
                this.orderList = orderList;
                this.isOrder = true;
                this.spinner.hide()
            })
        } else {
            const modalRef = this.modalService.open(LoginComponent);

        }

    }

    public myMagnitOrder() {
        if (localStorage.getItem('loginAutorization')) {
            this.spinner.show();
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
                word: this.text.toUpperCase(),
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

            this.magnetImg(order).subscribe((orderCard: CardItemResults[]) => {
                this.orderList = orderCard;
                this.isOrder = true;
                this.spinner.hide()
            })
        } else {
            const modalRef = this.modalService.open(LoginComponent);

        }

    }


}
