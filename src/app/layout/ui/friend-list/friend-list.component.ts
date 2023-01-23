import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  // Filtered Friends
  filteredFriends: [{ username: string, avatar: string, userId: string }];

  constructor(
    private authData: AuthData,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filteredFriends = this.authData.getFilteredFriends();
  }

  goToProfile(friend: { username: string, avatar: string, userId: string }): void {
    this.router.navigate([`/other-space-profile/${friend.userId}/${friend.username}`]);
  }

}
