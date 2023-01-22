import { Component, OnInit } from '@angular/core';
import { StorieModel } from 'src/app/models/storie/storie.model';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { StorieService } from 'src/app/services/storie/storieAPI/storie.service';

@Component({
  selector: 'app-add-stories',
  templateUrl: './add-stories.component.html',
  styleUrls: ['./add-stories.component.scss']
})
export class AddStoriesComponent implements OnInit  {
  // File
  selectedImageFile: File;
  selectedImage: string;

  // Validation
  storieTitle: string = '';

  constructor(
    public authData: AuthData,
    private storieService: StorieService
  ) { }

  ngOnInit(): void { }

  // Create Storie model
  onValidateStories(category: HTMLInputElement): void {
    if (!category || !this.selectedImage) return;

    const newStorie = new StorieModel();
    newStorie.category = category.value;
    newStorie.image = this.selectedImage;
    newStorie.creator = this.authData.getCurrentUsername();
    newStorie.userId = this.authData.getCurrentUserId();
    this.storieService.addOneStorie(newStorie, this.selectedImageFile);
  };

  // Read File (image)
  onPhotoSelected(photoSelector: HTMLInputElement): void {
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
  };

  // Reset Form
  onResetForm(title: HTMLInputElement, photoSelector: HTMLInputElement): void {
    title.value = null;
    photoSelector.value = null;
    this.selectedImageFile = null;
  };

}
