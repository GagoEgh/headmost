export interface CategoryDetails {
    id: number,
    name_en: string,
    name_ru: string,
    name_hy: string,
}

export class CategoryDetails {
    constructor() {
        this.id = 0
        this.name_en = ''
        this.name_ru = ''
        this.name_hy = ''
    }
}
