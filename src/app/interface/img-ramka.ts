import { CategoryDetails, CityDetails } from "./CategoryDetails";
import { ImageResponse, ImgColorValue } from "./ImageResponse";

export interface Painding {
    values: ImgColorValue ,
    imgs: ImageResponse[],
    id: number,
    categoryId: number

}

export interface Api {
 [key:string]:string
}


export interface Letter {
    [key:string]:boolean
}

export interface CountryResult extends CategoryDetails {
    country_regions: [{
        country: number
        id: number;
        name_en: string
        name_hy: string
        name_ru: string
        region_cities: CityDetails[]
    }]
}


export interface AboutQuestion {
    id: number
    isBlock: boolean
    answers: string
    label: string
}

export interface ServerResponce<T> {
    count: number
    next: null | string
    previous: null
    results: T
}