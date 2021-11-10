import { ImageResponse } from "./ImageResponse"

export interface WordResult {
    character: string
    image: ImageResponse
    index: number
    not_found?: boolean
}

