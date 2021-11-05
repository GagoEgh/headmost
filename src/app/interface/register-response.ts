import { CityDetails } from "./CityDetails";
import { UserDataResponse } from "./UserDataResponse";


export interface Edit {
    date_of_birth: string
    city: string
    address: string
    image: string
    comment: string
    last_name: string
    first_name: string
}


export interface UserDetalis extends UserDataResponse {
    city_details: CityDetails
}

export interface RegisterResult {
    token: string
    user_details: UserDetalis
}