import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSpaceStoryComponent } from './main-space-story.component';

describe('MainSpaceStoryComponent', () => {
  let component: MainSpaceStoryComponent;
  let fixture: ComponentFixture<MainSpaceStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSpaceStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSpaceStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
