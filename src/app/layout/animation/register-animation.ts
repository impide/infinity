import { state, style, trigger } from "@angular/animations";
import { Injectable } from "@angular/core";

export const RegisterAnimation = [
      // Animation Sign up - Login (Title)
      trigger('sectionState', [
        state('signIn', style({
            transform: 'translateX(0)',
            transition: 'all .5s'
        })),
        state('logIn', style({
            position: 'absolute',
            top: '0',
            right: '0',
            transform: 'translateX(100%)',
            transition: 'all .5s'
        }))
    ]),
    // Animation Sign up - Login (Body)
    trigger('registerState', [
        state('static', style({
            transform: 'translateX(0)',
            transition: 'all .5s'
        })),
        state('transition', style({
            transform: 'translateX(-100%)',
            transition: 'all .5s'
        }))
    ])
];

@Injectable({ providedIn: 'root' })
export class StateRegisterService {
    // State Animation Register
    titleAnimation: string = '';
    bodyAnimation: string = '';

    // Title
    titleIns!: boolean;
    titleCon!: boolean;

    // When Open Login modal
    toLoginState() {
        this.titleAnimation = 'logIn';
        this.bodyAnimation = 'transition';
        this.titleCon = true;
        this.titleIns = false;
    }

    // When Open Sign up modal
    toSignInState() {
        this.titleAnimation = 'signIn';
        this.bodyAnimation = 'static';
        this.titleCon = false;
        this.titleIns = true;
    }
}
