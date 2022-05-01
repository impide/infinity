import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/register/signin/signin.component';
import { SignupComponent } from './components/register/signup/signup.component';
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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    SignupComponent,
    MainSpaceStoryComponent,
    MainSpaceMessengerComponent,
    MainSpaceDiscoverComponent,
    MainSpaceProfileComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ViewPostComponent,
    AddPostComponent,
    DeletePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
