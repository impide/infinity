import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileRoutes, ProfileRoutesData } from 'src/app/core/data/routes-profile-data';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';

@Component({
  selector: 'app-main-space-profile',
  templateUrl: './main-space-profile.component.html',
  styleUrls: ['./main-space-profile.component.scss']
})
export class MainSpaceProfileComponent implements OnInit {
  // Routes Profile
  profileRoutes: ProfileRoutes[] = ProfileRoutesData;

  constructor(
    public router: Router,
    public authData: AuthData,
  ) { }

  ngOnInit(): void {}

}
