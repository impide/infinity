import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRegisterSpaceComponent } from './main-register-space.component';

describe('MainRegisterSpaceComponent', () => {
  let component: MainRegisterSpaceComponent;
  let fixture: ComponentFixture<MainRegisterSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRegisterSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRegisterSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
