import { state, style, trigger } from "@angular/animations";
import { Injectable } from "@angular/core";

export const RegisterAnimation = [
    // Animation Sign in - Login (Top)
    trigger('registerState', [
        state('static', style({
            transform: 'translateX(0)',
            transition: 'all .5s'
        })),
        state('transition', style({
            transform: 'translateX(-100%)',
            transition: 'all .5s'
        }))
    ]),// Animation Inscription - Connexion (Body)
    trigger('sectionState', [
        state('signIn', style({
            'background': 'linear-gradient(45deg,#174AB3,#4432B2,#212529)',
            'border-radius': '20px',
            transform: 'translateX(0)',
            transition: 'all .5s'
        })),
        state('logIn', style({
            'background': 'linear-gradient(45deg,#174AB3,#4432B2,#212529)',
            'border-radius': '20px',
            position: 'absolute',
            top: '0',
            right: '0',
            transform: 'translateX(100%)',
            transition: 'all .5s'
        }))
    ])
]

@Injectable({ providedIn: 'root' })
export class StateRegisterService {
    // State Animation Register (A Deplacer)
    defaultAnimation: string = '';
    stateAnimation: string = '';

    // Title
    titleIns!: boolean;
    titleCon!: boolean;

    // When Open Login modal
    toLoginState() {
        this.defaultAnimation = 'logIn';
        this.stateAnimation = 'transition';
        this.titleCon = true;
        this.titleIns = false;
    }

    // When Open Signin modal
    toSignInState() {
        this.defaultAnimation = 'signIn';
        this.stateAnimation = 'static';
        this.titleCon = false;
        this.titleIns = true;
    }
}