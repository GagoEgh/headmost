
import { BgDetails, CategoryDetails } from "./CategoryDetails";
import { FrameImages } from "./ImageResponse";


export interface FrameResults {
    bottom_line_image?: string
    description_en: string
    description_hy: string
    description_ru: string
    id: number
    left_bottom_corner_image: string
    left_line_image: string
    left_top_corner_image: string
    name_en: string
    name_hy: string
    name_ru: string
    price: number
    right_bottom_corner_image: string
    right_line_image: string
    right_top_corner_image: string
    show_image: string
    top_line_image: string
}

export interface FrameDetalis {
    background: number
    background_details: BgDetails
    created_frame_category: null | number
    created_frame_category_details: CategoryDetails
    frame: number
    frame_details: FrameResults
    frame_images: [FrameImages]
    id: number
    image: null | string
    is_magnet: boolean
    is_predefined: boolean
    price: number
    text_in_bottom: string | null
    text_in_top: string | null
    title: null | string
    user: number | null
    word: string
}

export interface CardItemResults {
    created_frame: number
    created_frame_details: FrameDetalis
    id: number
    user: number
}
