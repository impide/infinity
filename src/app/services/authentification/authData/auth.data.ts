import { Injectable } from "@angular/core";
import { catchError, EMPTY, finalize, map, Observable } from "rxjs";
import { UserModel } from "src/app/models/User/user.model";
import { AuthService } from "../authAPI/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthData {

    constructor(
        private authAPI: AuthService) { }

    // Return Username of current User as Observable
    getCurrentUsername(): string {
        return this.authAPI.currentUserData$.value.username;
    };

    // Return Avatar of current User as Observable
    getCurrentAvatar(): string {
        console.log(this.authAPI.currentUserData$.value.avatar);
        return this.authAPI.currentUserData$.value.avatar;
    };

    // Return Id of current User as Observable
    getCurrentUserId(): string {
        return this.authAPI.currentUserData$.value._id;
    };

    // Return e-mail of current User as Observable
    getCurrentEmail(): string {
        return this.authAPI.currentUserData$.value.email;
    };

    // Return all Users as Observable
    getUsers(): Observable<UserModel[]> {
        return this.authAPI.users$.asObservable();
    };

    // Users lists without current User
    getFilteredUsers(): Observable<UserModel[]> {
        return this.authAPI.users$.pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Users Done');
            }),
            map(
                users => users.filter(user => user._id !== this.getCurrentUserId())
            )
        );
    };

    // Friends of current User
    getFilteredFriends(): Observable<[{ username: string, avatar: string, userId: string }]> {
        return this.authAPI.users$.pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Friends Done');
            }),
            map(
                users => users.filter(user => user._id === this.getCurrentUserId())[0].friends
            )
        )
    };
}
