import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.api;
  token!: string;
  userId!: string;
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api + '/users/signup', { email: email, password: password }).subscribe(
        (signupData: { status: number, message: string }) => {
          if (signupData.status === 201) {
            // Authenticate User
            this.signin(email, password)
              .then(() => {
                resolve(true);
              })
              .catch((err) => {
                reject(err)
              });
          } else {
            reject(signupData.message);
          }
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  signin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api + '/users/signin', { email: email, password: password }).subscribe(
        (authData: { token: string, userId: string }) => {
          this.token = authData.token;
          this.userId = authData.userId;
          this.isAuth$.next(true);
          resolve(true);
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
