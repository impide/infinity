import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMasonryModule } from 'ngx-masonry';

import { AppComponent } from './app.component';
import { MainRegisterSpaceComponent } from './components/main-register-space/main-register-space.component';
import { RegisterComponent } from './components/main-register-space/register/register.component';
import { LoginComponent } from './components/main-register-space/register/login/login.component';
import { SigninComponent } from './components/main-register-space/register/signin/signin.component';
import { MainSpaceStoryComponent } from './components/main-space-story/main-space-story.component';
import { MainSpaceMessengerComponent } from './components/main-space-messenger/main-space-messenger.component';
import { MainSpaceProfileComponent } from './components/main-space-profile/main-space-profile.component';
import { HeaderComponent } from './layout/ui/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ViewPostComponent } from './layout/modal/view-post/view-post.component';
import { AddPostComponent } from './layout/modal/add-post/add-post.component';
import { DeletePostComponent } from './layout/modal/delete-post/delete-post.component';
import { UserProfileComponent } from './layout/ui/header/user-profile/user-profile.component';
import { FriendsListsComponent } from './components/main-space-messenger/friends-lists/friends-lists.component';
import { MainMessagesComponent } from './components/main-space-messenger/main-messages/main-messages.component';
import { CardComponent } from './layout/UI/card/card.component';
import { MainSpaceSettingComponent } from './components/main-space-setting/main-space-setting.component';
import { SidebarSettingComponent } from './components/main-space-setting/sidebar-setting/sidebar-setting.component';
import { ViewSettingComponent } from './components/main-space-setting/view-setting/view-setting.component';
import { SidebarProfileComponent } from './components/main-space-setting/sidebar-profile/sidebar-profile.component';
import { DashboardComponent } from './components/main-space-setting/components-setting/dashboard/dashboard.component';
import { AccountComponent } from './components/main-space-setting/components-setting/account/account.component';
import { NotificationComponent } from './components/main-space-setting/components-setting/notification/notification.component';
import { MessageComponent } from './components/main-space-setting/components-setting/message/message.component';
import { StoriesComponent } from './components/main-space-profile/stories/stories.component';
import { AddStoriesComponent } from './layout/Modal/add-stories/add-stories.component';
import { ViewStoriesComponent } from './layout/Modal/view-stories/view-stories.component';
import { UpdateStoriesComponent } from './layout/Modal/update-stories/update-stories.component';
import { ViewDetailComponent } from './layout/modal/view-detail/view-detail.component';
import { SettingComponent } from './layout/ui/setting/setting.component';
import { AvatarComponent } from './layout/ui/avatar/avatar.component';
import { AddPostButtonComponent } from './layout/ui/add-post-button/add-post-button.component';


@NgModule({
  declarations: [
    AppComponent,
    MainRegisterSpaceComponent,
    RegisterComponent,
    SigninComponent,
    LoginComponent,
    MainSpaceStoryComponent,
    MainSpaceMessengerComponent,
    MainSpaceProfileComponent,
    HeaderComponent,
    NotFoundComponent,
    ViewPostComponent,
    AddPostComponent,
    DeletePostComponent,
    UserProfileComponent,
    FriendsListsComponent,
    MainMessagesComponent,
    CardComponent,
    MainSpaceSettingComponent,
    SidebarSettingComponent,
    ViewSettingComponent,
    SidebarProfileComponent,
    DashboardComponent,
    AccountComponent,
    NotificationComponent,
    MessageComponent,
    StoriesComponent,
    AddStoriesComponent,
    ViewStoriesComponent,
    UpdateStoriesComponent,
    ViewDetailComponent,
    SettingComponent,
    AvatarComponent,
    AddPostButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxMasonryModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatProgressBarModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
