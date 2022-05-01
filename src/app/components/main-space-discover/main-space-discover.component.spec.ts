import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSpaceDiscoverComponent } from './main-space-discover.component';

describe('MainSpaceDiscoverComponent', () => {
  let component: MainSpaceDiscoverComponent;
  let fixture: ComponentFixture<MainSpaceDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSpaceDiscoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSpaceDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
