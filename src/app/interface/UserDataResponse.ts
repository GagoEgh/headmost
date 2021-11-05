import { UserInfo} from "./UserInfo";

export class UserDataResponse{
    constructor(){
        this.address= '',
        this.city= 0, 
        this.comment= '',
        this.date_of_birth= '',
        this.image= '',
        this.phone_number= null,
        this.user= 0,
        this.user_details= new UserInfo()
    }
}

export interface UserDataResponse {
    address: null | string
    city: number
    comment: string
    date_of_birth: string
    image: string
    phone_number: number | null
    user: number
    user_details:UserInfo
}
