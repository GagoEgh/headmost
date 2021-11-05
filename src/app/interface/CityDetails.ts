export class CityDetails {
    constructor() {
        this.id = 0,
        this.name_en = '',
        this.name_ru = '',
        this.name_hy = ''
    }
}

export interface CityDetails {
    id: number
    name_en: string
    name_hy: string
    name_ru: string
    region: number
}
