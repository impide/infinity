import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post/post.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { DeletePostComponent } from '../../modal/delete-post/delete-post.component';
import { ViewDetailComponent } from '../../modal/view-detail/view-detail.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  // Observables
  isAuth$: Observable<boolean> = this.authService.isAuth$.asObservable();

  // Post Data
  @Input() post: PostModel;

  constructor(
    public authData: AuthData,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  // Open Setting Modal (Detail Post)
  onDetailPost(post: PostModel): void {
    this.dialog.open(ViewDetailComponent, {
      data: {
        postData: post
      },
      panelClass: ['col-4']
    })
  };

  // Open Setting Modal (Delete Post)
  onDeletePost(_id: string): void {
    this.dialog.open(DeletePostComponent, {
      data: {
        _id: _id
      },
      panelClass: ['col-4']
    })
  };

}
