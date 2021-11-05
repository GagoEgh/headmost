import { ImageResponse } from "./ImageResponse"

export interface WordResult {
    character: string
    image: ImageResponse
    index: number
    not_found?: boolean
}

export class WordResult {
    constructor() {
        this.character = ''
        this.image = new ImageResponse()
        this.index = 0
        this.not_found = false
    }
}