import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  // Filtered Friends
  filteredFriends$: Observable<[{ username: string, avatar: string, userId: string }]>;

  constructor(
    public authData: AuthData,
  ) { }

  ngOnInit(): void {
    this.filteredFriends$ = this.authData.getFilteredFriends();
  }

}
