import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarRoutes, NavbarRoutesData } from 'src/app/core/data/routes-navbar-data';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Observable Authentification
  isAuth$: Observable<boolean> = this.authService.isAuth$.asObservable();

  // Routes Navbar
  navbarRoutes: NavbarRoutes[] = NavbarRoutesData;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
