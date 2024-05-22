import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainRegisterSpaceComponent } from './components/main-register-space/main-register-space.component';
import { RegisterComponent } from './components/main-register-space/register/register.component';
import { MainSpaceStoryComponent } from './components/main-space-story/main-space-story.component';
import { AuthGuard } from './services/authentification/authGuard/auth.guard';
import { MainSpaceMessengerComponent } from './components/main-space-messenger/main-space-messenger.component';
import { MainSpaceProfileComponent } from './components/main-space-profile/main-space-profile.component';
import { CardComponent } from './layout/ui/card/card.component';
import { MainSpaceSettingComponent } from './components/main-space-setting/main-space-setting.component';
import { DashboardComponent } from './components/main-space-setting/components-setting/dashboard/dashboard.component';
import { FriendListComponent } from './layout/ui/friend-list/friend-list.component';
import { OtherSpaceProfileComponent } from './components/other-space-profile/other-space-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'main-space-register', pathMatch: 'full' },

  // Register Path
  {
    path: 'main-space-register', component: MainRegisterSpaceComponent, children: [
      { path: 'register', component: RegisterComponent },
    ],
  },

  // Story Path
  { path: 'main-space-story', component: MainSpaceStoryComponent },

  // Messenger Path
  { path: 'main-space-messenger', component: MainSpaceMessengerComponent },

  // Setting Path
  {
    path: 'main-space-setting', component: MainSpaceSettingComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard-view', pathMatch: 'full' },
      { path: 'dashboard-view', component: DashboardComponent }
    ]
  },

  // Main Profile Path
  {
    path: 'main-space-profile/:id/:username', component: MainSpaceProfileComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'profile-publication', pathMatch: 'full' },
      { path: 'profile-publication', component: CardComponent },
      { path: 'profile-friend-list', component: FriendListComponent }
    ]
  },

  // Other Profile Path
  {
    path: 'other-space-profile/:id/:username', component: OtherSpaceProfileComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'profile-publication', pathMatch: 'full' },
      { path: 'profile-publication', component: CardComponent },
      { path: 'profile-friend-list', component: FriendListComponent }
    ]
  },

  // Not Found Path
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
