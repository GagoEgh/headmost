import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Api, Ceys, FramesImg, LetterImge, Painding, UserData, Value } from 'src/app/shared/img-ramka'
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { TranslateService } from "@ngx-translate/core";
import { LoginComponent } from '../register/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class FramesServService {
    validateForm: FormGroup = new FormGroup({});
    letterImges: LetterImge[] = [];
    framesImge: FramesImg[] = [];
    selectedValue: any[] = [];
    placeholder = '';
    lang = 'hy';
    fileUrl = {};
    isOrder: boolean = false;
    isSilki = false;
    orderList: any[] = [];
    orderListClone: any[] = [];
    background: any = {};
    ideaImg: any = {};
    topText: string = '';
    btmText: string = '';
    isRegister = false;
    isLogin = false;
    text: string = '';
    isMessage = false;
    index: number = 3;
    sum: number = 0;
    userReg = true;
    apiPhoto = true;
    fileList: any = [];
    token: string = '';
    isMyOrder = false;
    limit = 10;
    offset = 0;
    isTop = false;
    isdisible = false;
    scale: number = 1;
    magnit_scale :number = 1;
    userData: UserData = {
        address: '',
        city: 0,
        city_details: {
            id: 0,
            name_en: '',
            name_ru: '',
            name_hy: ''
        },
        comment: '',
        date_of_birth: '',
        image: '',
        phone_number: null,
        user: 0,
        user_details: {
            first_name: '',
            id: 0,
            is_active: false,
            is_staff: false,
            last_name: '',
            username: ''
        }
    };

    isImg = true;
    div: any = [];
    frame: any;




    api: Api = {
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


    painding: Painding = {
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


    imgColor: { ceys: Ceys, values: Value }[] = [
        {
            ceys: {
                id: 0,
                name_en: '',
                name_hy: '',
                name_ru: ''
            },
            values: {
                colored: false,
                withandblack: true,
                sepia: false,
                color: 'black',
                child: 'white',
            }

        }, {
            ceys: {
                id: 0,
                name_en: '',
                name_hy: '',
                name_ru: ''
            },
            values: {
                colored: true,
                withandblack: false,
                sepia: false,
                color: 'red',
                child: 'palevioletred',
            }
        }, {
            ceys: {
                id: 0,
                name_en: '',
                name_hy: '',
                name_ru: ''
            },
            values: {
                colored: false,
                withandblack: false,
                sepia: true,
                color: 'grey',
                child: 'grey',
            }
        }
    ];

    constructor(private url: HttpClient, public spinner: NgxSpinnerService, public _translate: TranslateService, public modalService: NgbModal) { }

    imgColorGet() {
        return this.url.get(this.api.worldApi + this.api.api_utils + this.api.api_color)
    }

    framesFoneGet() {
        return this.url.get(this.api.worldApi + this.api.api_utils + this.api.api_bgr)
    }

    getFrames() {
        return this.url.get(this.api.worldApi + this.api.api_utils + this.api.api_frame)
    }

    letterGet() {
        let text = this.text ? this.text : null;
        return this.url.get(this.api.worldApi + this.api.api_img + this.api.api_create_word + text + '/', {
            params: new HttpParams().set('color', this.painding.id.toString())
        });
    }

    letterColection(search: string = '', color: any = '', category: string = '') {
        return this.url.get(this.api.worldApi + this.api.api_img + this.api.api_img + '/?color=' + `${color}` + '&category=' + `${category}` + '&search=' + `${search}` + '&limit=1000')
    }

    getCategory() {
        return this.url.get(this.api.worldApi + this.api.api_utils + this.api.api_category)
    }

    getOrder(obj: any) {
        return this.url.post(this.api.worldApi + this.api.api_order + this.api.api_card + this.api.api_add,
            obj,
            { headers: { 'Authorization': this.token } }
        )
    }

    getCountry() {
        return this.url.get(this.api.worldApi + this.api.api_location + this.api.api_country)
    }

    deleteOrder(id: number) {
        return this.url.delete(this.api.worldApi + this.api.api_order + this.api.api_card + '/' + id + '/',
            { headers: { 'Authorization': this.token } }
        )
    }

    promoCodePost(data: any) {
        return this.url.post(this.api.worldApi + this.api.api_utils + this.api.api_promocode + this.api.api_check_promo, data)
    }

    userRegisterPost(obj: any) {
        return this.url.post(this.api.worldApi + this.api.api_userdetails + this.api.api_register, obj)

    }

    shipingMethod() {
        return this.url.get(this.api.worldApi + this.api.api_utils + '/' + this.api.api_shipping)
    }

    userOrder(obj: any) {
        return this.url.post(this.api.worldApi + this.api.api_order + this.api.api_order + '/', obj,
            { headers: { 'Authorization': this.token } })

    }

    userLogin(obj: any) {
        return this.url.post(this.api.worldApi + this.api.api_userdetails + this.api.api_login, obj,)

    }

    editUser(obj: any) {
        return this.url.put(this.api.worldApi + this.api.api_userdetails + this.api.api_edit, obj,
            { headers: { 'Authorization': this.token } })
    }

    userInfo() {
        return this.url.get(this.api.worldApi + this.api.api_order + this.api.api_card + '/?user=' + `${this.userData.user}`,
            { headers: { 'Authorization': this.token } })
    }

    userImage(obj: any) {
        return this.url.post(this.api.worldApi + this.api.api_img + this.api.api_user_image + '/', obj,
            { headers: { 'Authorization': this.token } })
    }



    userImageGet(myImgOffset: number) {
        return this.url.get(this.api.worldApi + this.api.api_img + this.api.api_user_image + '/?user=' + `${this.userData.user}&limit=10&offset=${myImgOffset}`,
            { headers: { 'Authorization': this.token } })
    }

    userCountry() {
        this.getCountry()
            .subscribe((el: any) => {
                this.selectedValue = el.results
            })
    }

    deleteUserImage(id: number) {
        return this.url.delete(this.api.worldApi + this.api.api_img + this.api.api_user_image + `/${id}/`,
            { headers: { 'Authorization': this.token } })
    }

    userOrderGet() {
        return this.url.get(this.api.worldApi + this.api.api_order + this.api.api_order + '/?user=' + `${this.limit}&offset=${this.offset}&user=${this.userData.user}`,
            { headers: { 'Authorization': this.token } })
    }

    orderCard(obj: any) {
        return this.url.post(this.api.worldApi + this.api.api_order + this.api.api_card + '/', obj,
            { headers: { 'Authorization': this.token } })
    }

    frameCategory() {
        return this.url.get(this.api.worldApi + this.api.api_utils + this.api.api_created_frame_category)
    }

    frameCategoryImg(category: any, predifined: any, offset: any) {
        return this.url.get(this.api.worldApi + this.api.api_img + this.api.api_created_frame + `/?created_frame_category=${category}&is_predefined=${predifined}&limit=10&offset=${offset}`)
    }

    imgCategory(id: number) {
        return this.url.get(this.api.worldApi + this.api.api_img + this.api.api_created_frame + `/${id}/`)
    }

    magnetImg(obj: any) {
        return this.url.post(this.api.worldApi + this.api.api_order + this.api.api_card + this.api.api_magnet + '/', obj,
            { headers: { 'Authorization': this.token } })
    }
    letterColorFone() {
        this.spinner.show();
        this.text = this.validateForm.get('text')?.value;

        this.letterGet().subscribe((el: any) => {

            this.letterImges = el;

            this.letterImges = this.letterImges.filter(img => {
                return !img.not_found
            })

            if (this.letterImges.length === 0 && this.text) {
                this.validateForm.reset();
                this.isMessage = true;
                this.isImg = true;
            }
            setTimeout(() => {
                this.spinner.hide();
            }, 1000)

        })

    }

    showFrame() {
        this.isOrder = false;
        this.isImg = true;
        this.validateForm.reset()
    }

    letterChar = 0;
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

            this.getOrder(order).subscribe((el: any) => {
                this.orderList = el;
                this.isOrder = true;
                this.spinner.hide()
            })
        } else {
            const modalRef = this.modalService.open(LoginComponent);

        }

    }


    myMagnitOrder() {
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

            this.magnetImg(order).subscribe((el: any) => {
                this.orderList = el;
                this.isOrder = true;
                this.spinner.hide()
            })
        } else {
            const modalRef = this.modalService.open(LoginComponent);

        }

    }


}
