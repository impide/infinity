import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RetrieveRoutesData } from 'src/app/core/data/retrieve-routes-id.service';
import { ProfileRoutes, ProfileRoutesData } from 'src/app/core/data/routes-profile-data';
import { NotifModel } from 'src/app/models/notif/notif.model';
import { UserModel } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { NotificationService } from 'src/app/services/notification/notificationAPI/notification.service';
import { NotificationData } from 'src/app/services/notification/notificationData/notification.data';

@Component({
  selector: 'app-other-space-profile',
  templateUrl: './other-space-profile.component.html',
  styleUrls: ['./other-space-profile.component.scss']
})
export class OtherSpaceProfileComponent implements OnInit {
  // Routes Profile
  profileRoutes: ProfileRoutes[] = ProfileRoutesData;
  routeUserId: string;
  routeParamSub: Subscription;

  // Notifications
  requestButton$: Observable<string>;

  // Target User
  targetSub: Subscription;
  targetUser$: Observable<UserModel>;
  targetUser: UserModel;

  constructor(
    public authData: AuthData,
    private authService: AuthService,
    private dataParamsUserRoute : RetrieveRoutesData,
    private activatedRoute: ActivatedRoute,
    private notificationData: NotificationData,
    private notifService: NotificationService,
  ) { }

  ngOnInit(): void {
    // Get Route_Id, Retrieve User with it and Store it
    this.retrieveRouteParams();
    this.retrieveTargetUser();
  }

  // Get Data From Route
  retrieveRouteParams(): void {
    this.routeParamSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.routeUserId = params.get('id');
      this.dataParamsUserRoute.setRoutesId(params.get('id'));
    });
  };

  retrieveTargetUser() {
    this.authService.getOneUser(this.routeUserId);
    this.authService.user$.subscribe(
      (user: UserModel) => {
        this.targetUser$ = this.authService.user$;
        this.targetUser = user;

        this.retrieveNotificationData();
        this.retrieveStateRequestData();
      }
    )
  }

  // Get Data From Notification(s)
  retrieveNotificationData(): void {
    this.requestButton$ = this.notificationData.requestButton$;
    this.notificationData.getNotificationData();
  };

  // Get State of Friend Request
  retrieveStateRequestData(): void {
    this.notificationData.getRequestValidating(this.targetUser?._id);
  };

  // Make a Friend Request
  onAddFriend(): void {
    const requestData = new NotifModel();
    requestData.requestCreateBy = this.authData.getCurrentUsername();
    requestData.requestCreateById = this.authData.getCurrentUserId();
    requestData.requestCreateByAvatar = this.authData.getCurrentAvatar();
    requestData.requestReceiverId = this.targetUser._id;
    requestData.typeOfRequest = 'FriendRequest';
    this.notifService.requestOneFriend(requestData, this.targetUser._id);
  };

  ngOnDestroy(): void {
    if (this.routeParamSub != null) {
      this.routeParamSub.unsubscribe();
    }
    if (this.targetSub != null) {
      this.targetSub.unsubscribe();
    }
  }

}
