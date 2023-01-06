import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileRoutes, ProfileRoutesData } from 'src/app/core/data/routes-profile-data';
import { NotifModel } from 'src/app/models/notif/notif.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { RouteData } from 'src/app/services/helpers/route/route.data';
import { NotificationService } from 'src/app/services/notification/notificationAPI/notification.service';
import { NotificationData } from 'src/app/services/notification/notificationData/notification.data';

@Component({
  selector: 'app-main-space-profile',
  templateUrl: './main-space-profile.component.html',
  styleUrls: ['./main-space-profile.component.scss']
})
export class MainSpaceProfileComponent implements OnInit {
  // Routes Profile
  profileRoutes: ProfileRoutes[] = ProfileRoutesData;

  currentUserId: string;
  targetUserId: string;
  targetUsername: string;
  targetAvatar: string;

  // Notifications
  requestButton: string;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public authData: AuthData,
    public authService: AuthService,
    private notificationData: NotificationData,
    private routeData: RouteData,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.retrieveRouteData();
    this.retrieveNotificationData();
    this.retrieveUsersData();
    this.currentUserId = this.authData.getCurrentUserId();
  };

  // Get Data From current Route
  retrieveRouteData(): void {
    this.targetUserId = this.routeData.targetUserId;
    this.targetUsername = this.routeData.targetUsername;
    this.routeData.getUrlData();
  }

  // Get Data From Notification(s)
  retrieveNotificationData(): void {
    this.requestButton = this.notificationData.requestButton;
    this.notificationData.getNotificationData();
  }

  // Get State of Friend Request
  retrieveUsersData(): void {
    this.targetAvatar = this.notificationData.targetAvatar;
    this.notificationData.getFilteredUserRequest(this.requestButton);
  }

  // Make a Friend Request
  onAddFriend(): void {
    const requestData = new NotifModel();
    requestData.requestCreateBy = this.authData.getCurrentUsername();
    requestData.requestCreateById = this.authData.getCurrentUserId();
    requestData.requestCreateByAvatar = this.authData.getCurrentAvatar();
    requestData.requestReceiverId = this.targetUserId;
    requestData.typeOfRequest = 'FriendRequest';
    this.notifService.requestOneFriend(requestData, this.targetUserId);
  }
}
