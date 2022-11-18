import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetrieveRoutesId } from 'src/app/core/data/retrieve-routes-id.service';
import { ProfileRoutes, ProfileRoutesData } from 'src/app/core/data/routes-profile-data';
import { AddPostComponent } from 'src/app/layout/modal/add-post/add-post.component';
import { NotifModel } from 'src/app/models/Notif/notif.model';
import { UserModel } from 'src/app/models/User/user.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-main-space-profile',
  templateUrl: './main-space-profile.component.html',
  styleUrls: ['./main-space-profile.component.scss']
})
export class MainSpaceProfileComponent implements OnInit, OnDestroy {
  // Routes Profile
  profileRoutes: ProfileRoutes[] = ProfileRoutesData;

  // Users Subscription 
  usersSub: Subscription;
  users: UserModel[];

  // Routes Subscription
  routeSub: Subscription;
  targetUserId: string;
  targetUsername: string;
  targetAvatar: string;

  // Notifications & Messages Subscription
  notifsSub: Subscription;
  notifs: NotifModel[];
  requestButton: string;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public authData: AuthData,
    public authService: AuthService,
    private retrieveRoutesId: RetrieveRoutesId,
    private route: ActivatedRoute,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.retrieveRouteData();
    this.retrieveNotificationData();
    this.retrieveUsersData();
  };

  retrieveRouteData(): void {
    // Retrieve data Url in Route (Id & Username)
    this.routeSub = this.route.params.subscribe(params => {
      this.targetUserId = params['id'];
      this.targetUsername = params['username'];
      // We send params Id for child component because cannot retrieve it using this way
      this.retrieveRoutesId.setRoutesId(params['id']);
    });
  }

  retrieveNotificationData(): void {
    // Get all Notifications (To check if a friend request already exists for this user)
    this.notifService.getNotifications();
    this.notifsSub = this.notifService.notifs$.subscribe(
      (notifs: NotifModel[]) => {
        // Here, we Search if the Current User has Create any Request (Filtering by his Id)
        const currentNotif = notifs.filter(x => x.requestCreateById === this.authData.getCurrentUserId());
        // Last, we Check if a Request at least been sent (Filtering by Target Id)
        if ((currentNotif.filter(x => x.requestReceiverId === this.targetUserId)).length > 0) {
          // Set the State of Request
          this.requestButton = 'Pending';
        }
      }
    )
  }

  retrieveUsersData(): void {
    // Get all Users (To check if this Users are already friends)
    this.authService.getAllUsers();
    this.usersSub = this.authService.users$.subscribe(
      (users: UserModel[]) => {
        // Before anything, Retrieve target User Avatar
        this.targetAvatar = users.filter(userId => userId._id === this.targetUserId)[0].avatar;
        // If the request is "Pending" then no need to continue
        if (this.requestButton === 'Pending') {
          return;
        }
        // Else, Retrieve the data of current User connected
        this.users = users.filter(x => x._id === this.authData.getCurrentUserId());
        // We filtered the previous data for check if target User Profile was already friend
        for (let i = 0; i < this.users.filter(x => x.friends).length; i++) {
          const filteredFriends = this.users.filter(x => x.friends[i]?.username === this.targetUsername);
          if (filteredFriends.length > 0) {
            // Set the State of Request
            this.requestButton = 'Already Friend';
          } else {
            this.requestButton = 'Add Friend';
          }
        }
      }
    )
  }

  // Make a Friend Request
  onAddFriend(): void {
    // Construct the Notification Model
    const requestData = new NotifModel();
    requestData.requestCreateBy = this.authData.getCurrentUsername();
    requestData.requestCreateById = this.authData.getCurrentUserId();
    requestData.requestCreateByAvatar = this.authData.getCurrentAvatar();
    requestData.requestReceiverId = this.targetUserId;
    requestData.typeOfRequest = 'FriendRequest';
    this.notifService.requestOneFriend(requestData, this.targetUserId);
  }

  // Create a new Post
  onCreatePost(): void {
    this.dialog.open(AddPostComponent, {
      panelClass: ['col-4']
    });
  }

  // Unsubscribe to Route
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}