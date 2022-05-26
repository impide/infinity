import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddPostComponent } from 'src/app/layout/modal/add-post/add-post.component';
import { DeletePostComponent } from 'src/app/layout/modal/delete-post/delete-post.component';
import { ViewPostComponent } from 'src/app/layout/modal/view-post/view-post.component';
import { LikeModel, PostModel } from 'src/app/models/Post/post.model';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-main-space-story',
  templateUrl: './main-space-story.component.html',
  styleUrls: ['./main-space-story.component.scss']
})
export class MainSpaceStoryComponent implements OnInit {
  // Posts Observable
  posts$: Observable<PostModel[]> = this.postService.posts$.asObservable();

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Get Posts
    this.postService.getPosts();
  }

  // Create a Post
  onCreatePost() {
    this.dialog.open(AddPostComponent, {
      panelClass: ['col-4']
    });
  }

  // Like a Post
  onLikePost(post: PostModel) {
    const userId = new LikeModel();
    userId.userId = this.authService.getCurrentUserId();
    this.postService.addOneLike(post, userId);
  }

  // View Post in Modal
  onViewPost(post: PostModel) {
    this.dialog.open(ViewPostComponent, {
      panelClass: ['col-8'],
      data: {
        postData: post
      }
    });
  }

  // Open Setting (Delete Post)
  onOpenSetting(_id: string) {
    this.dialog.open(DeletePostComponent, {
      data: {
        _id: _id
      },
      panelClass: ['col-4']
    })
  }

}

export interface PostsModel {
  postData: PostModel
}

export interface PostId {
  _id: string;
}