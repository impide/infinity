import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AddPostComponent } from '../modal/add-post/add-post.component';

@Component({
  selector: 'app-add-post-button',
  templateUrl: './add-post-button.component.html',
  styleUrls: ['./add-post-button.component.scss']
})
export class AddPostButtonComponent implements OnInit {
  // Observables
  isAuth$: Observable<boolean> = this.authService.isAuth$.asObservable();

  constructor(
    public dialog: MatDialog,
    public authService: AuthService
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
