import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  // Create a new Account
  onSignup(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { username, email, password } = form.value;
    this.authService.signup(username, email, password);
    form.reset();
  }
}
