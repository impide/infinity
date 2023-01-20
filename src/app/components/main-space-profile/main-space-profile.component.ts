import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetrieveRoutesData } from 'src/app/core/data/retrieve-routes-id.service';
import { ProfileRoutes, ProfileRoutesData } from 'src/app/core/data/routes-profile-data';
import { NotifModel } from 'src/app/models/notif/notif.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { NotificationService } from 'src/app/services/notification/notificationAPI/notification.service';
import { NotificationData } from 'src/app/services/notification/notificationData/notification.data';

@Component({
  selector: 'app-main-space-profile',
  templateUrl: './main-space-profile.component.html',
  styleUrls: ['./main-space-profile.component.scss']
})
export class MainSpaceProfileComponent implements OnInit, OnDestroy {
  // Routes Profile
  profileRoutes: ProfileRoutes[] = ProfileRoutesData;
  routeSub: Subscription;
  isCurrentUser: boolean;

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
    private dataParamsUserRoute : RetrieveRoutesData,
    private activatedRoute: ActivatedRoute,
    private notificationData: NotificationData,
    private notifService: NotificationService,
  ) { }

  ngOnInit(): void {
    // Init Notification and Users Data
    this.retrieveRouteParams();
    this.retrieveNotificationData();
    this.retrieveUsersData();
    this.currentUserId = this.authData.getCurrentUserId();
  };

  /* Get Data From Route Do not move the code elsewhere, since the route will
  change directly to publication, the parameters will not be recoverable anymore */
  retrieveRouteParams(): void {
    this.routeSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.targetUserId = params.get('id');
      this.targetUsername = params.get('username');

      this.dataParamsUserRoute.setRoutesId(params.get('id'));
      this.dataParamsUserRoute.setRoutesUsername(params.get('username'));

      this.isCurrentUserProfile(params);
    });
  };

  // Get Data From Notification(s)
  retrieveNotificationData(): void {
    this.requestButton = this.notificationData.requestButton;
    this.notificationData.getNotificationData();
  };

  // Get State of Friend Request
  retrieveUsersData(): void {
    this.targetAvatar = this.notificationData.targetAvatar;
    this.notificationData.getFilteredUserRequest(this.requestButton);
  };

  isCurrentUserProfile(params: ParamMap): void {
    this.authData.getCurrentUserId() === params.get('id') ? this.isCurrentUser = true : this.isCurrentUser = false;
  };

  // Make a Friend Request
  onAddFriend(): void {
    const requestData = new NotifModel();
    requestData.requestCreateBy = this.authData.getCurrentUsername();
    requestData.requestCreateById = this.authData.getCurrentUserId();
    requestData.requestCreateByAvatar = this.authData.getCurrentAvatar();
    requestData.requestReceiverId = this.targetUserId;
    requestData.typeOfRequest = 'FriendRequest';
    this.notifService.requestOneFriend(requestData, this.targetUserId);
  };

  ngOnDestroy(): void {
    if (this.routeSub != null) {
      this.routeSub.unsubscribe();
    };
  };
}
