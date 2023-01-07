import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddStoriesComponent } from 'src/app/layout/modal/add-stories/add-stories.component';
import { UpdateStoriesComponent } from 'src/app/layout/modal/update-stories/update-stories.component';
import { ViewStoriesComponent } from 'src/app/layout/modal/view-stories/view-stories.component';
import { StorieModel } from 'src/app/models/storie/storie.model';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { StorieService } from 'src/app/services/storie/storieAPI/storie.service';
import { StorieData } from 'src/app/services/storie/storieData/storie.data';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  stories$: Observable<StorieModel[]>;

  constructor(
    public dialog: MatDialog,
    public authData: AuthData,
    public storieData: StorieData,
    private storiesAPI: StorieService
  ) { }

  ngOnInit(): void {
    /* Stories API */
    this.stories$ = this.storiesAPI.stories$;
    this.storiesAPI.getStories();
    this.storieData.getStories();
  }

  // Current storie view
  onViewStories(category: string): void {
    const dialogRef = this.dialog.open(ViewStoriesComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp', 'custom-dialog-container'],
      data: {
        storiesCategories: this.storieData.getCategory(category)
      }
    });

    // Init progress after closed
    dialogRef.afterClosed().subscribe(() => {
      clearInterval(this.storiesAPI.interval);
      this.storieData.resetProgress();
    });
  }

  // Add new storie
  onAddStories(): void {
    this.dialog.open(AddStoriesComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp'],
      autoFocus: false
    })
  }

  // Delete or add storie on existing category
  onUpdateStories(): void {
    this.dialog.open(UpdateStoriesComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp'],
      autoFocus: false
    })
  }

}

export interface StorieViewModal {
  storiesCategories: StorieModel[];
}
