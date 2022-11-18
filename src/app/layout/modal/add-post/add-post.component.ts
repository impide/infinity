import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/Post/post.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  // File
  selectedImageFile: File;
  selectedImage: string;

  constructor(
    public authData: AuthData,
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  // Create & Save Post
  onCreatePost(commentInput: HTMLTextAreaElement) {
    const post = new PostModel();
    post.content = commentInput.value;
    post.image = this.selectedImage;
    post.creator = this.authData.getCurrentUsername();
    post.avatarCreator = this.authData.getCurrentAvatar();
    post.userId = this.authData.getCurrentUserId();
    this.postService.addOnePost(post, this.selectedImageFile);
  }

  // Read File (image)
  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files[0];
    if (!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
        this.selectedImage = readableString;
      }
    );
  }

}
