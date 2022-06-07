import { CityDetails } from "./CategoryDetails.module";
import { FrameDetalis } from "./frame-response.module";


export interface ShipingResult {
    city: CityDetails
    name_en: string
    name_hy: string
    name_ru: string
    price: number|string
    id:number
}

export interface OrderResult {
    address: string
    city: number
    city_details: CityDetails
    comment: string
    created_at: string
    email: string
    full_name: string
    id: number
    order_items: []
    order_items_details?: [{
        created_frame: number
        created_frame_details: FrameDetalis
        id: number
        order: number
    }]
    phone_number: string
    postal_code: string
    price: number
    promo_code: null
    promo_code_details: null
    shipping_method: number
    shipping_method_details?:ShipingResult
    // {
    //     city: CityDetails
    //     id: number
    //     name_en: string
    //     name_hy: string
    //     name_ru: string
    //     price: number
    // }
    status?: string
    user?: number
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