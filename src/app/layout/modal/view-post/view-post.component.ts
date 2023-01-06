import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PostsModel } from 'src/app/components/main-space-story/main-space-story.component';
import { CommentModel, PostModel } from 'src/app/models/post/post.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { CommentService } from 'src/app/services/comment/comment.service';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { ViewDetailComponent } from '../view-detail/view-detail.component';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  // Observable Authentification
  isAuth$: Observable<boolean> = this.authService.isAuth$.asObservable();

  // Retrieve Data Post
  avatarCreator: string = this.post.postData.avatarCreator;
  creator: string = this.post.postData.creator;
  image: string = this.post.postData.image;
  content: string = this.post.postData.content;

  // Post Comments Subscription
  commentsSub: Subscription;
  comments: CommentModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public post: PostsModel,
    public authData: AuthData,
    public dialog: MatDialog,
    public router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    // Get all Comments
    this.commentService.getCommentsById(this.post.postData._id);
    this.commentsSub = this.commentService.comments$.subscribe(
      (comments: CommentModel[]) => {
        this.comments = comments.filter(x => x.postId === this.post.postData._id);
      }
    )
  }

  isCommentCreator(comment: CommentModel) {
    try {
      return comment.userId === this.authData.getCurrentUserId();
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  onAddComment(commentInput: HTMLInputElement) {
    // Retrieve PostId
    const postId = this.post.postData._id;
    // Construct Comment Model
    const comment = new CommentModel();
    comment.creator = this.authData.getCurrentUsername();
    comment.comment = commentInput.value;
    comment.postId = this.post.postData._id;
    comment.userId = this.authData.getCurrentUserId();
    // Call the Service
    this.commentService.addOneComment(comment, postId);
    commentInput.value = '';
  };

    // Open Setting Modal (Detail Post)
    onDetailPost() {
      const post = {
        creator: this.post.postData.creator,
        likes: this.post.postData.likes,
        createdAt: this.post.postData.createdAt
      }

      this.dialog.open(ViewDetailComponent, {
        data: {
          postData: post
        },
        panelClass: ['col-4']
      })
    };

    // Open Setting Modal (Delete Post)
    onDeletePost() {
      const _id = this.post.postData._id;
      this.dialog.open(DeletePostComponent, {
        data: {
          _id: _id
        },
        panelClass: ['col-4']
      })
    };

  goToProfile(): void {
    this.router.navigate(['/main-space-profile', this.post.postData._id, this.post.postData.creator]);
    this.dialog.closeAll();
  }

}
