import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../../modal/add-post/add-post.component';

@Component({
  selector: 'app-add-post-button',
  templateUrl: './add-post-button.component.html',
  styleUrls: ['./add-post-button.component.scss']
})
export class AddPostButtonComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  // Create a new Post
  onCreatePost(): void {
    this.dialog.open(AddPostComponent, {
      panelClass: ['col-4']
    });
  }

}
