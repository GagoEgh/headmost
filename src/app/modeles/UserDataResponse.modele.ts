import { UserInfo} from "./UserInfo.modele";

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
