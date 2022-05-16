import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewStoryComponent } from 'src/app/layout/modal/view-story/view-story.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onStory(story: StoryLists) {
    this.dialog.open(ViewStoryComponent, {
      panelClass: ['col-12', 'col-sm-8', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-4', 'animate__animated', 'animate__slideInUp', 'p-0'],
      data: {
        duration: story.duration,
        cover: story.cover,
        view: story.view,
      }
    })
  }

  storyLists: StoryLists[] = [
    {
      duration: 3,
      cover: 'https://urlz.fr/igWp',
      view: false
    },
    {
      duration: 3,
      cover: 'https://urlz.fr/igWq',
      view: false
    }]

}

export interface StoryLists {
  duration: number;
  cover: string;
  view: boolean;
}
