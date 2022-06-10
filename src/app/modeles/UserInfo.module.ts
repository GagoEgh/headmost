import { CategoryDetails } from "./CategoryDetails.modele";


export interface UserInfo {
    first_name: string,
    id: number,
    is_active: boolean,
    is_staff: boolean,
    last_name: string,
    username: string
}

export interface UserData extends UserDataResponse {
    city_details: CategoryDetails
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