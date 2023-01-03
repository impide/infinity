import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { StateRegisterService } from 'src/app/layout/animation/register-animation';
import { SnackBarService } from 'src/app/layout/snackbar/snackbar-service';
import { Data } from 'src/app/models/Data/data.model';
import { UserModel } from 'src/app/models/User/user.model';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../notification/notificationAPI/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Token & Api (url)
  private api = environment.api;
  token: string;

  // Observable Users
  users: UserModel[];
  users$ = new Subject<UserModel[]>();

  // Observable Current User
  isAuth$ = new BehaviorSubject<boolean>(false);
  currentUserData$ = new BehaviorSubject<UserModel>(
    { _id: null, username: '', email: '', avatar: '', friends: [{ username: '', avatar: '', userId: '' }] }
  );

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackbar: SnackBarService,
    private stateRegister: StateRegisterService,
    private notifService: NotificationService) {
    this.initAuth();
  }

  // If Local Data => Retrieve and Ppdate it (launched after any refresh)
  initAuth() {
    if (typeof localStorage !== "undefined") {
      const data = JSON.parse(localStorage.getItem('auth'));
      if (data) {
        const userData: UserModel = data.userData;
        const token = data.token;
        if (token) {
          /* Authenticate current User */
          this.token = token;
          this.isAuth$.next(true);
          /* Load Current User Data */
          this.currentUserData$.next({
            ...userData
          });
        }
      }
    }
  }

  // Return all Users
  getAllUsers(): Subscription {
    return this.http.get<Data>(this.api + '/users/').subscribe(
      {
        next: (userData: Data) => {
          this.users = userData.result;
          this.users$.next([...this.users]);
        },
        error: (userData: Data) => {
          this.snackbar.openSnackBar(userData.message, 5);
        }
      }
    )
  };

  // Create a new User
  signup(username: string, email: string, password: string) {
    const avatar = 'https://images.unsplash.com/photo-1648381758790-d585916446a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
    return this.http.post(this.api + '/users/signup', { username: username, email: email, password: password, avatar: avatar }).subscribe(
      {
        next: () => {
          this.snackbar.openSnackBar('User Created Successfully', 3);
          this.stateRegister.toLoginState();
        },
        error: (authData: Data) => {
          this.snackbar.openSnackBar(authData.message, 5);
        }
      }
    )
  }

  // Authenticate User => must signup first
  signin(email: string, password: string) {
    return this.http.post(this.api + '/users/login', { email: email, password: password }).subscribe(
      {
        next: (authData: { token: string, userData: UserModel }) => {
          this.token = authData.token;
          /* Retrieve current user Data */
          this.currentUserData$.next({
            ...authData.userData
          });
          /* Authentification Bool */
          this.isAuth$.next(true);
          /* Retrieve Notification */
          this.notifService.getNotifications();
          /* Connexion Message */
          this.snackbar.openSnackBar('You are now Connected', 3);
          if (typeof localStorage !== "undefined") {
            localStorage.setItem('auth', JSON.stringify(authData));
            /* Close Dialog */
            this.dialog.closeAll();
            this.router.navigate(['/main-space-story']);
          }
        },
        error: (authData: Data) => {
          this.snackbar.openSnackBar(authData.message, 5);
        }
      }
    )
  }

  // Update Avatar Profile
  updateOneAvatar(id: string, image: File) {
    console.log(image);

    let userData: FormData = new FormData();
    userData.append('image', image);
    return this.http.put(this.api + '/users/' + id + '/update-avatar', userData).subscribe(
      {
        next: () => {
          this.snackbar.openSnackBar('You will be disconnected to apply the changes', 3);
          setTimeout(() => {
            this.logout();
          }, 5000);
        },
        error: (updateData: Data) => {
          this.snackbar.openSnackBar(updateData.message, 5);
        }
      }
    )
  }

  // Logout the User connected
  logout(): void {
    /* Delete all Local Storage Data */
    this.isAuth$.next(false);
    this.token = null;
    this.currentUserData$.next({
      _id: null,
      username: 'Anonyme',
      email: null,
      avatar: null,
      friends: null
    });
    this.notifService.notifs = null;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem('auth', null);
    }
    this.router.navigate(['/main-space-register']);
  }

}
