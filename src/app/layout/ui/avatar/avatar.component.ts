import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post/post.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  // Observables
  isAuth$: Observable<boolean> = this.authService.isAuth$.asObservable();

  // Post Data
  @Input() post: PostModel;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  // Go to Profile User
  goToProfile(post: PostModel): void {
    this.router.navigate(['/main-space-profile', post.userId, post.creator]);
  }

}
