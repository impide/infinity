import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tablists: tabLists[] = [
    { tabName: 'Feed', route: '/main-home/main-story-space' },
    { tabName: 'Disover', route: '' },
    { tabName: 'Messenger', route: '' }
  ]

}

export interface tabLists {
  tabName: string;
  route: string;
}