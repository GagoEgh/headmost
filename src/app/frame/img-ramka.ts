export interface Ceys {
    id: number,
    name_en: string,
    name_hy: string,
    name_ru: string
}

export interface Value {
    colored: boolean,
    withandblack: boolean,
    sepia: boolean,
    color: string,
    child: string,
}

export interface Painding {
    values: Value,
    imgs: any[],
    id: number,
    categoryId: number

}

export interface Api {
    worldApi: string,
    api_utils: string,
    api_bgr: string,
    api_frame: string,
    api_color: string,
    api_category: string,
    api_character: string,
    api_created_frame_category: string,
    api_promocode: string,
    api_img: string,
    api_create_word: string,
    api_order:string,
    api_card:string,
    api_add:string,
    api_location:string,
    api_country:string
}

export interface FramesImg {
    id: number,
    name_en: string,
    name_ru: string,
    name_hy: string,
    description_en: string,
    description_ru: string,
    description_hy: string,
    price: number,
    corner_image: string,
    line_image: string,
    show_image: string,
}

export interface LetterImge {
    index: number,
    not_found: boolean,
    character: string,
    image:Image 

}

export interface Image{
    id: number,
    image: string, 
    thumbnail: string, 
    category: number,
    category_details:CategoryDetails,
    color: number,
    color_details:ColorDetails,
    character: number,
    character_details:CharacterDetails
}

export interface CategoryDetails{
    id: number,
    name_en: string,
    name_ru: string,
    name_hy: string,
}

export interface ColorDetails{
    id: number,
    name_en: string,
    name_ru: string,
    name_hy: string,
}

export interface CharacterDetails{
    id: number,
    character: string,
}

export interface Category{
    id:number,
    name_en: string,
    name_hy: string,
    name_ru:string
  }

  export  interface Letter {
      isSpan: boolean,
      isMenu: boolean,
      isForm: boolean
    }
