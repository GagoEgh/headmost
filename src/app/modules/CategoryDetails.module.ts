export interface CategoryDetails {
    id: number,
    name_en: string,
    name_ru: string,
    name_hy: string,
}

export interface BgDetails {
    color: string
    id: number
    image: null
    name: string
}

export interface CityDetails {
    id: number
    name_en: string
    name_hy: string
    name_ru: string
    region: number
}

export interface CharacterDetails {
    id: number,
    character: string,
}
