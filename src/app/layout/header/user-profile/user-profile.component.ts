import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RegisterComponent } from 'src/app/components/main-register-space/register/register.component';
import { NotifModel, RequestValidated } from 'src/app/models/Notif/notif.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { NotificationService } from 'src/app/services/notification/notificationAPI/notification.service';
import { StateRegisterService } from '../../animation/register-animation';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // Observable Authentification
  isAuth$ = this.authService.isAuth$.asObservable();

  // Notifications Subscription
  notifsSub: Subscription;
  notifs: NotifModel[];

  // Type of Request & Messages
  typeOfRequest: string;
  notifMessage: string;

  constructor(
    public authData: AuthData,
    public authService: AuthService,
    public dialog: MatDialog,
    private notifService: NotificationService,
    private stateRegister: StateRegisterService
  ) { }

  ngOnInit(): void {
    // Get all Notifs
    this.notifService.getNotifications();
    this.notifsSub = this.notifService.notifs$.subscribe(
      (notifs: NotifModel[]) => {
        // We Retrieve notifications of current User
        this.notifs = notifs.filter(x => x.requestReceiverId === this.authData.getCurrentUserId());
      }
    )
  }

  // Accept the Friend Request
  onAcceptNewFriend(notif: NotifModel) {
    // Construct Request Model
    const requestValidated = new RequestValidated();
    requestValidated.requestCreatedById = notif.requestCreateById;
    requestValidated.requestCreatedByAvatar = notif.requestCreateByAvatar;
    requestValidated.requestCreatedByusername = notif.requestCreateBy;
    requestValidated.requestReceiverId = this.authData.getCurrentUserId();
    requestValidated.requestReceiverAvatar = this.authData.getCurrentAvatar();
    requestValidated.requestReceiverUsername = this.authData.getCurrentUsername();
    this.notifService.acceptOneFriend(requestValidated, notif._id);
  }

  // Delete Notif
  onDeleteNotification(id: string) {
    this.notifService.deleteNotification(id);
  }

  // Open Sign in Modal
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

  // Disconnect User
  onLogout(): void {
    this.authService.logout();
  }

}
