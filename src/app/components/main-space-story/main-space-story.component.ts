import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddPostComponent } from 'src/app/layout/modal/add-post/add-post.component';
import { ViewPostComponent } from 'src/app/layout/modal/view-post/view-post.component';
import { LikeModel, PostModel } from 'src/app/models/Post/post.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-main-space-story',
  templateUrl: './main-space-story.component.html',
  styleUrls: ['./main-space-story.component.scss']
})
export class MainSpaceStoryComponent implements OnInit {
  // Observables
  isAuth$: Observable<boolean> = this.authService.isAuth$.asObservable();
  posts$: Observable<PostModel[]> = this.postService.posts$.asObservable();

  userId: string;

  constructor(
    public dialog: MatDialog,
    public authData: AuthData,
    public authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Get Posts
    this.postService.getPosts();
    this.userId = this.authData.getCurrentUserId();
  };

  // Create a Post
  onCreatePost(): void {
    this.dialog.open(AddPostComponent, {
      panelClass: ['col-4']
    });
  };

  // Like a Post
  onLikePost(post: PostModel) {
    const userId = new LikeModel();
    userId.userId = this.authData.getCurrentUserId();
    this.postService.addOneLike(post, userId);
  };

  // View Post in Modal
  onViewPost(post: PostModel) {
    this.dialog.open(ViewPostComponent, {
      panelClass: ['col-8'],
      data: {
        postData: post
      }
    });
  };

};

export interface PostsModel {
  postData: PostModel
};

export interface PostId {
  _id: string;
};
