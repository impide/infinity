import { Component, OnInit } from '@angular/core';
import { NavbarRoutes, NavbarRoutesData } from 'src/app/core/data/routes-navbar-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Routes Navbar
  navbarRoutes: NavbarRoutes[] = NavbarRoutesData;

  constructor() { }

  ngOnInit(): void {
  }

}