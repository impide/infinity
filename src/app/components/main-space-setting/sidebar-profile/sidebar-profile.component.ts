import { Component, OnInit } from '@angular/core';
import { InterfaceLanguage } from 'src/app/core/data/retrieve-languages-data';
import { ProfileSettings } from 'src/app/core/data/retrieve-profile-setting-data';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
  styleUrls: ['./sidebar-profile.component.scss']
})
export class SidebarProfileComponent implements OnInit {
  // File
  selectedImageFile: File;

  // Language
  interfaceLanguage: { language: string }[] = InterfaceLanguage;
  selectedLanguage = this.interfaceLanguage[0].language;

  constructor(
    public authData: AuthData,
    public authService: AuthService,
    public profileSettingService: ProfileSettings
  ) { }

  ngOnInit(): void { }

  onUpdateAvatar() {
    if (!this.selectedImageFile) return;
    const id = this.authData.getCurrentUserId();
    this.authService.updateOneAvatar(id, this.selectedImageFile);
  }

  // Read File (Avatar)
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
      }
    );
  }
}
