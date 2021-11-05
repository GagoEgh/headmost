export class UserInfo{
    constructor(){
        this.first_name= '',
        this.id= 0,
        this.is_active= false,
        this.is_staff= false,
        this.last_name= '',
        this.username=''
    }
}

export interface UserInfo {
    first_name: string,
    id: number,
    is_active: boolean,
    is_staff: boolean,
    last_name: string,
    username: string
}
