import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-register-space',
  templateUrl: './main-register-space.component.html',
  styleUrls: ['./main-register-space.component.scss']
})
export class MainRegisterSpaceComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

}
