import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddPostComponent } from 'src/app/layout/modal/add-post/add-post.component';
import { ViewPostComponent } from 'src/app/layout/modal/view-post/view-post.component';
import { PostModel } from 'src/app/models/Post/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-main-space-story',
  templateUrl: './main-space-story.component.html',
  styleUrls: ['./main-space-story.component.scss']
})
export class MainSpaceStoryComponent implements OnInit {
  posts: PostModel[] = [];
  postsSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.posts$.subscribe(
      (posts: PostModel[]) => {
        this.posts = posts;
      }
    )
  }

  onCreatePost() {
    this.dialog.open(AddPostComponent, {
      panelClass: ['col-4']
    });
  }

  onViewPost(post: PostModel) {
    this.postService.getPostById(post._id);
    this.dialog.open(ViewPostComponent, {
      panelClass: ['col-8'],
      data: {
        postData: post
      }
    });
  }

}

export interface PostsModel {
  postData: PostModel
}
