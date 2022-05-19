import { Component, OnInit } from '@angular/core';
import { SettingRoutes, SettingRoutesData } from 'src/app/core/data/routes-setting-data';

@Component({
  selector: 'app-sidebar-setting',
  templateUrl: './sidebar-setting.component.html',
  styleUrls: ['./sidebar-setting.component.scss']
})
export class SidebarSettingComponent implements OnInit {

  settingRoutes: SettingRoutes[] = SettingRoutesData;

  constructor() { }

  ngOnInit(): void {
  }
}
