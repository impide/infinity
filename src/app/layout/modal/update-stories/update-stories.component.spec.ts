import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStoriesComponent } from './update-stories.component';

describe('UpdateStoriesComponent', () => {
  let component: UpdateStoriesComponent;
  let fixture: ComponentFixture<UpdateStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
