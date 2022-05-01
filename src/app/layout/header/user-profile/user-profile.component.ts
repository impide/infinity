import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/components/main-register-space/register/register.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StateRegisterService } from '../../animation/register-animation';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private stateRegister: StateRegisterService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAuthToSign(): void {
    this.stateRegister.toSignInState();
    this.dialog.open(RegisterComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp'],
      autoFocus: false,
      disableClose: true
    });
  }

  // Open Login in Modal
  onAuthToLog(): void {
    this.stateRegister.toLoginState();
    const dialogRef = this.dialog.open(RegisterComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp'],
      autoFocus: false,
      disableClose: true
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

}
