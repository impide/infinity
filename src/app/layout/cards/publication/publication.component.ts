import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetrieveRoutesId } from 'src/app/core/data/retrieve-routes-id.service';
import { PostModel } from 'src/app/models/Post/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { DeletePostComponent } from '../../modal/delete-post/delete-post.component';
import { ViewPostComponent } from '../../modal/view-post/view-post.component';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy {
  // Observable Posts
  posts: PostModel[] = [];
  postsSub: Subscription;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private authService: AuthService,
    private postService: PostService,
    private retrieveRoutesId: RetrieveRoutesId,
  ) { }

  ngOnInit(): void {
    // Get all Posts
    this.postService.getPosts();
    this.postsSub = this.postService.posts$.subscribe(
      (posts: PostModel[]) => {
        // If Router Url = CurrentUserId, we show only his posts
        if (this.router.url.includes(this.authService.getCurrentUserId())) {
          this.posts = posts.filter(x => x.userId === this.authService.getCurrentUserId());
          // If Router Url = TargetUserId we do the same previous thing
        } else {
          this.posts = posts.filter(x => x.userId === this.retrieveRoutesId.getRoutesId());
          console.log('Second Case');
        }
      }
    )
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

  // Unsubscribe to Post
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}

export interface PostsModel {
  postData: PostModel
}

export interface PostId {
  _id: string;
}
