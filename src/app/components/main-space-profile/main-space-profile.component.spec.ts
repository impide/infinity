import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSpaceProfileComponent } from './main-space-profile.component';

describe('MainSpaceProfileComponent', () => {
  let component: MainSpaceProfileComponent;
  let fixture: ComponentFixture<MainSpaceProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSpaceProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSpaceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
