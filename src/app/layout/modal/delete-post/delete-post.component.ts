import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostId } from 'src/app/components/main-space-story/main-space-story.component';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public postId: PostId,
  ) { }

  ngOnInit(): void { }

  onDeletePost() {
    return this.postService.deletePost(this.postId._id);
  }

  onCloseModal() {
    return this.dialog.closeAll();
  }

}
