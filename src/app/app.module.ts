import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { MainRegisterSpaceComponent } from './components/main-register-space/main-register-space.component';
import { RegisterComponent } from './components/main-register-space/register/register.component';
import { LoginComponent } from './components/main-register-space/register/login/login.component';
import { SigninComponent } from './components/main-register-space/register/signin/signin.component';
import { MainSpaceStoryComponent } from './components/main-space-story/main-space-story.component';
import { MainSpaceMessengerComponent } from './components/main-space-messenger/main-space-messenger.component';
import { MainSpaceDiscoverComponent } from './components/main-space-discover/main-space-discover.component';
import { MainSpaceProfileComponent } from './components/main-space-profile/main-space-profile.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { ViewPostComponent } from './layout/modal/view-post/view-post.component';
import { AddPostComponent } from './layout/modal/add-post/add-post.component';
import { DeletePostComponent } from './layout/modal/delete-post/delete-post.component';
import { UserProfileComponent } from './layout/header/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    MainRegisterSpaceComponent,
    RegisterComponent,
    SigninComponent,
    LoginComponent,
    MainSpaceStoryComponent,
    MainSpaceMessengerComponent,
    MainSpaceDiscoverComponent,
    MainSpaceProfileComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ViewPostComponent,
    AddPostComponent,
    DeletePostComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatCheckboxModule,
    NgxMasonryModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
