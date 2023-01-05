import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsModel } from 'src/app/components/main-space-story/main-space-story.component';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
  creator: string;
  likes: number;
  date: Date;


  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public post: PostsModel
  ) { }

  ngOnInit(): void {
    this.creator = this.post.postData.creator;
    this.likes = this.post.postData.likes.length;
    this.date = this.post.postData.createdAt;
  }

  onCloseModal() {
    return this.dialog.closeAll();
  }

}
