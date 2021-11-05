import { CategoryDetails } from "./CategoryDetails"
import { CityDetails } from "./CityDetails"
import { UserDataResponse } from "./UserDataResponse"

export class  UserData extends UserDataResponse {
    constructor(){
        super()
        this.city_details = new CityDetails()
    }
}

export interface UserData extends UserDataResponse {
    city_details: CategoryDetails
}
