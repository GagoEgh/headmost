import { CategoryDetails } from "./CategoryDetails";
import { CharacterDetails } from "./CharacterDetails";


export class ImageResponse {
    constructor() {
        this.category = 0
        this.category_details = new CategoryDetails()
        this.character = 0;
        this.character_details = new CharacterDetails()
        this.color = 0;
        this.color_details = new CategoryDetails()
        this.id = 0;
        this.thumb_image = '';
        this.image = ''
        this.thumbnail = ''
    }
}

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

