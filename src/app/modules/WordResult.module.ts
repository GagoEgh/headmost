import { ImageResponse } from "./ImageResponse.module"

export interface WordResult {
    character: string
    image: ImageResponse
    index: number
    not_found?: boolean
}

