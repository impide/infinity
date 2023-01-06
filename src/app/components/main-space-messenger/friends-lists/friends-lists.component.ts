import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';

@Component({
  selector: 'app-friends-lists',
  templateUrl: './friends-lists.component.html',
  styleUrls: ['./friends-lists.component.scss']
})
export class FriendsListsComponent implements OnInit {
  // Filtered users & Filtered friends
  filteredUsers$: Observable<UserModel[]>;
  filteredFriends$: Observable<[{ username: string, avatar: string, userId: string }]>;

  // Filter Users on Search bar
  searchText: string;

  // Mat Expansion
  panelOpenState: boolean = false;

  constructor(
    public authData: AuthData,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Get all Users
    this.authService.getAllUsers();
    this.filteredUsers$ = this.authData.getFilteredUsers();
    this.filteredFriends$ = this.authData.getFilteredFriends();
  }

  // Go to target Profile User
  goToProfile(user: UserModel): void {
    this.router.navigate(['/main-space-profile', user._id, user.username]);
  }

}
