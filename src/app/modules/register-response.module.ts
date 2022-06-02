import { CityDetails } from "./CategoryDetails.module";
import { UserDataResponse } from "./UserDataResponse.module";


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