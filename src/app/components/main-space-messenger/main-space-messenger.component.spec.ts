import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSpaceMessengerComponent } from './main-space-messenger.component';

describe('MainSpaceMessengerComponent', () => {
  let component: MainSpaceMessengerComponent;
  let fixture: ComponentFixture<MainSpaceMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSpaceMessengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSpaceMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
