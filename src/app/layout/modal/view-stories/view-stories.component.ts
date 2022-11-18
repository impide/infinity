import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorieViewModal } from 'src/app/components/main-space-profile/stories/stories.component';
import { StorieModel } from 'src/app/models/Storie/storie.model';
import { StorieService } from 'src/app/services/storie/storieAPI/storie.service';
import { StorieData } from 'src/app/services/storie/storieData/storie.data';

@Component({
  selector: 'app-view-stories',
  templateUrl: './view-stories.component.html',
  styleUrls: ['./view-stories.component.scss']
})
export class ViewStoriesComponent implements OnInit {
  // Index Image 
  indexImage: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public importedStorieData: StorieViewModal,
    public storieData: StorieData,
    public storiesService: StorieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.importedStorieData);
    this.storieData.getFilteredLength();
    this.proceedAnimationStorie();
  }

  // Lecture Storie(s)
  proceedAnimationStorie() {
    /* Condition for one Storie => */
    if (this.storieData.storiesLength <= 1) {
      const currentStories: StorieModel[] = this.importedStorieData.storiesCategories;

      this.storiesService.interval = setInterval(() => {
        currentStories[0].progress += 1;
        /* Storie => Progress Completed & Clean up */
        if (currentStories[0].progress >= 105) {
          clearInterval(this.storiesService.interval);
          currentStories[0].progress = 0;
          this.dialog.closeAll();
        }
      }, 50)

    } else {
      /* Condition for many Stories => */
      let currentIndex: number = 0;
      const currentStorie: StorieModel[] = this.importedStorieData.storiesCategories;
      let totalLength: number = this.storieData.storiesLength;

      this.storiesService.interval = setInterval(() => {
        // Controls => Manage error & Clean up Before anything else 
        if (currentIndex === totalLength) {
          clearInterval(this.storiesService.interval);
          for (let i = 0; i < currentStorie.length; i++) {
            currentStorie[i].progress = 0;
          }
          this.dialog.closeAll();
          return;
        }

        /* Storie => Progress Completed & Clean up */
        currentStorie[currentIndex].progress += 1;
        if (currentStorie[currentIndex].progress >= 105) {
          currentIndex++;
          this.indexImage++;
        }
      }, 50);
    }
  }


}
