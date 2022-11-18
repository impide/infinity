import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../authAPI/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthService) {

  }
  canActivate(): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      this.authService.isAuth$.subscribe(
        (value: boolean) => {
          const isAuth = value;
          if (isAuth) {
            resolve(isAuth);
          } else {
            reject(isAuth);
          }
        }
      )
    });
  }

}
