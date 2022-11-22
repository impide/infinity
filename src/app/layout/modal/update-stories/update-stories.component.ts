import { Component, OnInit } from '@angular/core';
import { StorieModel } from 'src/app/models/Storie/storie.model';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { StorieService } from 'src/app/services/storie/storieAPI/storie.service';
import { StorieData } from 'src/app/services/storie/storieData/storie.data';

@Component({
  selector: 'app-update-stories',
  templateUrl: './update-stories.component.html',
  styleUrls: ['./update-stories.component.scss']
})
export class UpdateStoriesComponent implements OnInit {
  // Options
  optionsChoice: string;

  // Stories
  uniqueCategory: StorieModel[];
  selectedCategory: string;
  selectedNumber: string;
  storieIdToDelete: string;

  // File
  selectedImageFile: File;
  selectedImage: string;

  constructor(
    public authData: AuthData,
    public storieData: StorieData,
    private storiesService: StorieService
  ) { }

  ngOnInit(): void {}

  // Select a Option for updating
  chooseOption(option: string) {
    this.optionsChoice = option;
    // Clean up
    this.selectedCategory = null;
    this.selectedImageFile = null;
    this.selectedImage = null;
    this.selectedNumber = null;
  }

  onValidateStories() {
    if (!this.selectedCategory || !this.selectedImage) {
      return;
    }
    // Create Storie model
    const createStories = new StorieModel();
    createStories.category = this.selectedCategory;
    createStories.image = this.selectedImage;
    createStories.creator = this.authData.getCurrentUsername();
    createStories.userId = this.authData.getCurrentUserId();
    this.storiesService.addOneStorie(createStories, this.selectedImageFile);
  }

  selectedOneStorie(storie: StorieModel) {
    return this.storieIdToDelete = storie._id;
  }

  onDeleteStories() {
    // Display All Image and Create a Checkbox for Retrieve ID et do Deletion
    if (!(this.selectedCategory) || !(this.selectedNumber)) {
      return;
    }

    switch (this.selectedNumber) {
      case 'one': {
        this.storiesService.deleteStorie(this.storieIdToDelete);
        break;
      }
      case 'multiple': {
        console.log('Multiple');
        break;
      }
    }
  };

  // Filtered Categories by Selection
  filteredCategory(selectedCategory: string): StorieModel[] {
    return this.storieData.getCategory(selectedCategory);
  };

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
