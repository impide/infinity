import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/authentification/authAPI/auth.service";
import { AuthData } from "src/app/services/authentification/authData/auth.data";

@Injectable({ providedIn: 'root' })
export class ProfileSettings {
    constructor(private authData: AuthData) { }


    ProfileSettingData: ProfileSetting[] = [{
        infosClass: 'bi-person-lines-fill',
        inputType: 'text',
        inputValue: this.authData.getCurrentUsername()
    },
    {
        infosClass: 'bi-shield-lock',
        inputType: 'password',
        inputValue: 'mypassword'
    },
    {
        infosClass: 'bi-envelope',
        inputType: 'text',
        inputValue: this.authData.getCurrentEmail()
    }];


}

export interface ProfileSetting {
    infosClass: string;
    inputType: string;
    inputValue: string;
}