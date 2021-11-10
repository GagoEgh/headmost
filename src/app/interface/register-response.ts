import { CityDetails } from "./CategoryDetails";
import { UserDataResponse } from "./UserDataResponse";


export interface Edit {
 [key:string]:string
}


export interface UserDetalis extends UserDataResponse {
    city_details: CityDetails
}

export interface RegisterResult {
    token: string
    user_details: UserDetalis
}