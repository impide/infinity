import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoriesComponent } from './view-stories.component';

describe('ViewStoriesComponent', () => {
  let component: ViewStoriesComponent;
  let fixture: ComponentFixture<ViewStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
