import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/authentification/auth.service";

@Injectable({ providedIn: 'root' })
export class ProfileSettings {
    constructor(private authService: AuthService) { }


    ProfileSettingData: ProfileSetting[] = [{
        infosClass: 'bi-person-lines-fill',
        inputType: 'text',
        inputValue: this.authService.getCurrentUsername()
    },
    {
        infosClass: 'bi-shield-lock',
        inputType: 'password',
        inputValue: 'mypassword'
    },
    {
        infosClass: 'bi-envelope',
        inputType: 'text',
        inputValue: this.authService.getCurrentEmail()
    }];


}

export interface ProfileSetting {
    infosClass: string;
    inputType: string;
    inputValue: string;
}