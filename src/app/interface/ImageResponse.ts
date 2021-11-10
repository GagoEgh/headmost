import { CategoryDetails, CharacterDetails } from "./CategoryDetails";


export interface ImageResponse {
    category: number
    category_details: CategoryDetails
    character: number
    character_details: CharacterDetails
    color: number
    color_details: CategoryDetails
    id: number
    image: string
    thumbnail: string;
    thumb_image: string
}


export interface FrameImages {
    character: number
    character_details: CharacterDetails
    created_frame: number
    id: number
    image: number
    image_details: ImageResponse
    order_index: number
    user_image: null
    user_image_details: null
}

export interface ImgColorValue {
    colored: boolean,
    withandblack: boolean,
    sepia: boolean,
    color: string,
    child: string,
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

export interface UserImage {
    id: number
    image: string
    thumb_image: string
    user: number
}