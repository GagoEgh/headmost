import { CategoryDetails } from "./CategoryDetails";
import { CityDetails } from "./CityDetails";
import { ImageResponse } from "./ImageResponse";


export interface ImgColorValue {
    colored: boolean,
    withandblack: boolean,
    sepia: boolean,
    color: string,
    child: string,
}

export interface Painding {
    values: ImgColorValue ,
    imgs: ImageResponse[],
    id: number,
    categoryId: number

}

export interface Api {
    worldApi: string,
    api_utils: string,
    api_bgr: string,
    api_frame: string,
    api_color: string,
    api_category: string,
    api_character: string,
    api_created_frame_category: string,
    api_promocode: string,
    api_img: string,
    api_create_word: string,
    api_order: string,
    api_card: string,
    api_add: string,
    api_location: string,
    api_country: string,
    api_check_promo: string,
    api_userdetails: string,
    api_register: string,
    api_shipping: string,
    api_login: string,
    api_edit: string,
    api_files: string,
    api_user_image: string,
    api_created_frame: string,
    api_magnet: string
}

export interface FramesImg extends CategoryDetails {
    description_en: string,
    description_ru: string,
    description_hy: string,
    price: number,
    corner_image: string,
    line_image: string,
    show_image: string,
}

export interface Letter {
    isSpan: boolean,
    isMenu: boolean,
    isForm: boolean
}

export interface BgDetails {
    color: string
    id: number
    image: null
    name: string
}

export interface CountryResult extends CategoryDetails {
    country_regions: [{
        country: number
        id: number
        name_en: string
        name_hy: string
        name_ru: string
        region_cities: CityDetails[]
    }]
}

export interface PromoCodeResults {
    discounted_price: number
    promo_code: {
        code: string
        count: number
        created_at: string
        end_date: string
        id: number
        percent: number
        until_date_ends: boolean
        user_max_count: number
    }
}

export interface UserImage {
    id: number
    image: string
    thumb_image: string
    user: number
}

export interface ServerResponce<T> {
    count: number
    next: null | string
    previous: null
    results: T
}
