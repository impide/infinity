import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/layout/snackbar/snackbar-service';
import { Data } from 'src/app/models/Data/data.model';
import { CommentModel } from 'src/app/models/Post/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // Auth Data
  private api = environment.api;

  // Observable Comments
  comments: CommentModel[];
  comments$ = new Subject<CommentModel[]>();

  constructor(
    private http: HttpClient,
    private snackbar: SnackBarService
  ) { }

  // Get all Comments (Id of the Post User click)
  getCommentsById(id: string) {
    return this.http.get(this.api + '/posts/' + id + '/comments').subscribe(
      {
        next: (commentData: Data) => {
          this.comments = commentData.result;
          this.emitComments();
        },
        error: (commentData: Data) => {
          this.snackbar.openSnackBar(commentData.message, 5);
        }
      }
    )
  }

  // Add a new Comment
  addOneComment(comment: CommentModel, id: string) {
    return this.http.post(this.api + '/posts/' + id + '/comments', comment).subscribe(
      {
        next: () => {
          this.getCommentsById(id);
        },
        error: (commentData: Data) => {
          this.snackbar.openSnackBar(commentData.message, 5);
        }
      }
    )
  }

  emitComments() {
    this.comments$.next([...this.comments]);
  }
}
