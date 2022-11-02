import { CityDetails } from "./CategoryDetails.modele";
import { UserDataResponse } from "./UserDataResponse.module";


export interface UserDetalis extends UserDataResponse {
    city_details: CityDetails
}

export interface RegisterResult {
    token: string
    user_details: UserDetalis
}