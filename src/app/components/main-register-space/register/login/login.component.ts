import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {}

  // Login into existing Account
  onSubmit(form: NgForm): void {
    const { email, password } = form.value;
    this.authService.signin(email, password);
  };

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  };

}
