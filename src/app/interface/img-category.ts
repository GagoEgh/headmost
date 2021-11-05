import { CharacterDetails } from "./CharacterDetails";
import { ImageResponse } from "./ImageResponse"


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