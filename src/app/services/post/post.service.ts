import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, take } from 'rxjs';
import { SnackBarService } from 'src/app/layout/Material/snackbar/snackbar-service';
import { Data } from 'src/app/models/data/data.model';
import { LikeModel, PostModel } from 'src/app/models/post/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Auth Data
  private api = environment.api;
  token!: string;
  userId!: string;

  // Observable Posts
  posts: PostModel[];
  posts$ = new Subject<PostModel[]>();

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackbar: SnackBarService) { }

  // Get all Posts
  getPosts() {
    return this.http.get(this.api + '/posts/').subscribe({
      next: (postData: Data) => {
        this.posts = postData.result;
        this.emitPosts();
      },
      error: (postData: Data) => {
        this.snackbar.openSnackBar(postData.message, 5);
      }
    });
  }

  // Add a new Post
  addOnePost(post: PostModel, image: File) {
    let postData: FormData = new FormData();
    postData.append('post', JSON.stringify(post));
    postData.append('image', image);
    return this.http.post(this.api + '/posts/add-post', postData).subscribe(
      {
        next: () => {
          this.getPosts();
          this.snackbar.openSnackBar('Post Created Successfully', 3);
          this.dialog.closeAll();
        },
        error: (postData: Data) => {
          this.snackbar.openSnackBar(postData.message, 5);
        }
      }
    )
  }

  // Like a Post
  addOneLike(post: PostModel, userId: LikeModel) {
    return this.http.post(this.api + '/posts/' + post._id + '/likes', userId).subscribe(
      {
        next: (postData: Data) => {
          const indexPost = this.posts.indexOf(post);
          if (indexPost !== -1) {
            this.posts[indexPost].likes = postData.result.likes;
            this.posts$.next([...this.posts]);
          }
        },
        error: (postData: Data) => {
          this.snackbar.openSnackBar(postData.message, 5);
        }
      }
    )
  }

  // Delete a Post
  deletePost(id: string) {
    return this.http.delete(this.api + '/posts/' + id).pipe(take(1)).subscribe(
      {
        next: () => {
          this.getPosts();
          this.snackbar.openSnackBar('Post deleted successfully', 3);
          this.dialog.closeAll();
        },
        error: (postData: Data) => {
          this.snackbar.openSnackBar(postData.message, 5);
        }
      }
    )
  }

  // deletePost2(id: string): Observable<Data> {
  //   return this.http.delete<Data>(`${this.api}'/posts/${id}`);
  // }

  emitPosts() {
    this.posts$.next([...this.posts]);
  }


}
