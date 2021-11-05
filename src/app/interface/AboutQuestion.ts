export interface AboutQuestion {
    id: number
    isBlock: boolean
    _answers: string
    _label: string
}

export class AboutQuestion{
    constructor(){
        this.id= 0,
        this.isBlock= false,
        this._answers= '',
        this._label= ''
    }
}
