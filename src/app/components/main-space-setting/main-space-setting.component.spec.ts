import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSpaceSettingComponent } from './main-space-setting.component';

describe('MainSpaceSettingComponent', () => {
  let component: MainSpaceSettingComponent;
  let fixture: ComponentFixture<MainSpaceSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSpaceSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSpaceSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
