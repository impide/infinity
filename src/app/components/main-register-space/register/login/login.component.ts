import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from 'src/app/layout/snackbar/snackbar-service';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  // Login into existing Account
  onSubmit(form: NgForm) {
    this.authService.signin(form.value.email, form.value.password);
  }

}
