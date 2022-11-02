import { ImageResponse } from "./ImageResponse.modele"

export interface WordResult {
    character: string
    image: ImageResponse
    index: number
    not_found?: boolean
}

