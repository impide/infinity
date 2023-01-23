import { Injectable } from "@angular/core";
import { map, Observable, } from "rxjs";
import { UserModel } from "src/app/models/user/user.model";
import { AuthService } from "../authAPI/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthData {

  constructor(
    private authAPI: AuthService) { }

  // Return Boolean if current User is Connected
  getIsAuth(): boolean {
    return this.authAPI.isAuth$.value;
  }

  // Return Username of current User as Observable
  getCurrentUsername(): string {
    return this.authAPI.currentUserData$.value.username;
  };

  // Return Avatar of current User as Observable
  getCurrentAvatar(): string {
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

  // Friends of Current User (Value)
  getFilteredFriends(): [{ username: string, avatar: string, userId: string }] {
    return this.authAPI.currentUserData$.value.friends;
  }

  // Return all Users as Observable
  getUsers(): Observable<UserModel[]> {
    return this.authAPI.users$.asObservable();
  };

  // All Users without Current User
  getFilteredUsers(): Observable<UserModel[]> {
    return this.authAPI.users$.pipe(
      map(
        users => users.filter(user => user._id !== this.getCurrentUserId())
      )
    );
  };

}
