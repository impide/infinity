import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetrieveRoutesId } from 'src/app/core/data/retrieve-routes-id.service';
import { RoutesProfileData, TabSpaces } from 'src/app/core/data/routes-profile-data';
import { AddPostComponent } from 'src/app/layout/modal/add-post/add-post.component';
import { NotifModel } from 'src/app/models/Notif/notif.model';
import { UserModel } from 'src/app/models/User/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-main-space-profile',
  templateUrl: './main-space-profile.component.html',
  styleUrls: ['./main-space-profile.component.scss']
})
export class MainSpaceProfileComponent implements OnInit, OnDestroy {
  // Tab Lists
  tabSpace: TabSpaces[] = RoutesProfileData;

  // Observable Users
  usersSub: Subscription;
  users: UserModel[];

  // Observable Route
  routeSub: Subscription;
  targetUserId: string;
  targetUsername: string;

  // Observable Notifications & Message
  notifsSub: Subscription;
  notifs: NotifModel[];
  requestButton: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    private retrieveRoutesId: RetrieveRoutesId,
    private route: ActivatedRoute,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    // Get all Users
    this.authService.getUsers();
    this.usersSub = this.authService.users$.subscribe(
      (users: UserModel[]) => {
        // Retrieve the data of current User connected
        this.users = users.filter(x => x._id === this.authService.getCurrentUserId());
        // We filtered the previous data for check if target User Profile was already friend
        const filteredFriends = this.users.filter(x => x.friends.filter(x => x.username === this.targetUsername));
        if (filteredFriends.length > 0) {
          // Set the State of Request
          this.requestButton = 'Already Friend';
          return;
        }
      }
    )

    // Retrieve data Url in Route
    this.routeSub = this.route.params.subscribe(params => {
      this.targetUserId = params['id'];
      this.targetUsername = params['username'];
      this.retrieveRoutesId.setRoutesId(params['id']);
    });

    // Get all Notifications
    this.notifsSub = this.notifService.notifs$.subscribe(
      (notifs: NotifModel[]) => {
        // Here, we Search if the Current User has Create any Request (Filtering by his Id)
        const currentNotif = notifs.filter(x => x.requestCreateById === this.authService.getCurrentUserId());
        // If not, Set the State of Request
        if (currentNotif.length === 0) {
          this.requestButton = 'Add Friend';
          return;
        }
        // Last, we Check if a Request at least been sent (Filtering by Target Id)
        if (currentNotif.filter(x => x.requestReceiverId === this.targetUserId)) {
          // Set the State of Request
          this.requestButton = 'Pending';
          return;
        }
      }
    )
  }

  // Make a Friend Request
  onAddFriend() {
    const requestData = new NotifModel();
    requestData.requestCreateBy = this.authService.getCurrentUsername();
    requestData.requestCreateById = this.authService.getCurrentUserId();
    requestData.requestCreateByAvatar = this.authService.getCurrentAvatar();
    requestData.requestReceiverId = this.targetUserId;
    requestData.typeOfRequest = 'FriendRequest';
    this.notifService.requestOneFriend(requestData, this.targetUserId);
  }

  // Create a new Post
  onCreatePost() {
    this.dialog.open(AddPostComponent, {
      panelClass: ['col-4']
    });
  }

  // Unsubscribe to Route
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }


}


