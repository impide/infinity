import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PostId } from 'src/app/components/main-space-story/main-space-story.component';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public postId: PostId
  ) { }

  ngOnInit(): void { }

  onDeletePost(): Subscription {
    return this.postService.deletePost(this.postId._id);
  }

  onCloseModal(): void {
    return this.dialog.closeAll();
  }

}
