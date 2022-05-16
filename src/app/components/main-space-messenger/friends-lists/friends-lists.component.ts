import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/User/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-friends-lists',
  templateUrl: './friends-lists.component.html',
  styleUrls: ['./friends-lists.component.scss']
})
export class FriendsListsComponent implements OnInit {
  // Users Subscription
  newUsersSub: Subscription;
  newUsers: UserModel[];

  // Friends Subscription
  friendsLists: { username: string, avatar: string, userId: string }[] = [];

  // Filter Users on Search bar
  searchText: string;

  // Mat Expansion
  panelOpenState = false;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Get all Users
    this.authService.getAllUsers();
    this.newUsersSub = this.authService.users$.subscribe(
      (users: UserModel[]) => {
        // Filtered Users lists without current User
        this.newUsers = users.filter(x => x._id !== this.authService.getCurrentUserId());
        // Filtered Users friends-lists of current User
        this.friendsLists = users.filter(x => x._id === this.authService.getCurrentUserId())[0].friends;
      }
    )
  }

  // Go to target Profile User
  goToProfile(user: UserModel): void {
    this.router.navigate(['/main-space-profile', user._id, user.username]);
  }

}
