import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Api, Ceys, FramesImg, LetterImge, Painding, UserData, Value } from 'src/app/shared/img-ramka'
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FramesServService {

    validateForm: FormGroup = new FormGroup({});
    letterImges: LetterImge[] = [];
    framesImge: FramesImg[] = [];
    selectedValue: any[] = [];
    isOrder: boolean = false;
    orderList: any[] = [];
    token: string = 'Token';
    background: any = {};
    topText: string = '';
    btmText: string = '';
    isRegister = false;
    isLogin = false;
    text: string = '';
    isMessage = false;
    index: number = 3;
    userData:UserData={
        phone_number:0,
        first_name:'',
        last_name:'',
        date_of_birth:'',
        city:'',
        password:'',
        comment:'',
        image:''
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
        api_login:'login/'
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


    constructor(private url: HttpClient) { }

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
        return this.url.get(this.api.worldApi + this.api.api_img + this.api.api_create_word + this.text + '/', {
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
            { headers: { 'Authorization': 'Token e3488062bef3993ccb0871c945f4d62c1d18aea6' } }
        )
    }

    getCountry() {
        return this.url.get(this.api.worldApi + this.api.api_location + this.api.api_country)
    }

    deleteOrder(id: number) {
        return this.url.delete(this.api.worldApi + this.api.api_order + this.api.api_card + '/' + id + '/',
            { headers: { 'Authorization': 'Token e3488062bef3993ccb0871c945f4d62c1d18aea6' } }
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
          //  { headers: { 'Authorization': 'Token e3488062bef3993ccb0871c945f4d62c1d18aea6' } })
          {headers:{'Authorization': ''+localStorage.getItem('Authorization')}})
        
    }

                      //  /userdetails/login/?is_staff_login=True
    userLogin(obj:any){
        return this.url.post(this.api.worldApi +this.api.api_userdetails+this.api.api_login+'?is_staff_login=True',obj,
        {headers:{'Authorization': ''+localStorage.getItem('Authorization')}})
    }

    userCountry() {
        this.getCountry()
            .subscribe((el: any) => {
                this.selectedValue = el.results
            })
    }

    letterColorFone() {
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
        })

    }

    showFrame() {
        this.isOrder = false;
        this.isImg = true;
        this.validateForm.reset()
    }

}
