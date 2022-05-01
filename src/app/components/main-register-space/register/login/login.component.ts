import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from 'src/app/layout/snackbar/snackbar-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  // Submit Form
  onSubmit(form: NgForm) {
    // this.authService.login(form.value.email, form.value.password);
  }

}
