import { CityDetails } from "./CityDetails";
import { FrameDetalis } from "./frame-response";


export interface ShipingResult {
    city: CityDetails
    name_en: string
    name_hy: string
    name_ru: string
    price: number
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
    shipping_method_details?:
    {
        city: CityDetails
        id: number
        name_en: string
        name_hy: string
        name_ru: string
        price: number
    }
    status?: string
    user?: number
}
