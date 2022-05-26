import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddStoriesComponent } from 'src/app/layout/modal/add-stories/add-stories.component';
import { UpdateStoriesComponent } from 'src/app/layout/modal/update-stories/update-stories.component';
import { ViewStoriesComponent } from 'src/app/layout/modal/view-stories/view-stories.component';
import { StorieModel } from 'src/app/models/Storie/storie.model';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { StorieService } from 'src/app/services/storie/storie.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {

  storiesSub: Subscription;
  stories: StorieModel[] = [];
  allstories: StorieModel[] = [];

  constructor(
    public dialog: MatDialog,
    private storiesService: StorieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Retrieve Stories
    this.storiesService.getStories();
    this.storiesSub = this.storiesService.stories$.subscribe(
      (stories: StorieModel[]) => {
        const filteredStories = stories.filter(stories => stories.userId === this.authService.getCurrentUserId());
        // Retrieve all Stories for other method working
        this.allstories = filteredStories;
        // Show only unique Stories Category
        this.stories = filteredStories.filter((value, index, self) =>
          index === self.findIndex((x) => (x.category === value.category)));
      }
    )
  }

  // Open Modal for view current Storie
  onViewStories(category: string): void {
    const dialogRef = this.dialog.open(ViewStoriesComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp', 'custom-dialog-container'],
      data: {
        storiesCategories: this.allstories.filter(x => x.category === category)
      }
    });

    // Init values after closed
    dialogRef.afterClosed().subscribe(() => {
      clearInterval(this.storiesService.interval);
      for (let i = 0; i < this.allstories.length; i++) {
        this.allstories[i].progress = 0;
      }
    });
  }

  // Open Modal for add new Storie
  onAddStories(): void {
    this.dialog.open(AddStoriesComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp'],
      autoFocus: false
    })
  }

  // Open Modal for delete or add Storie on a existing category
  onUpdateStories(): void {
    this.dialog.open(UpdateStoriesComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp'],
      autoFocus: false,
      data: {
        stories: this.allstories
      }
    })
  }

  ngOnDestroy(): void {
    this.storiesSub.unsubscribe();
  }

}

export interface StorieViewModal {
  storiesCategories: StorieModel[];
}

export interface UpdateStories {
  stories: StorieModel[];
}
