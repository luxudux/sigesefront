import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSupCenComponent } from './nav-sup-cen.component';

describe('NavSupCenComponent', () => {
  let component: NavSupCenComponent;
  let fixture: ComponentFixture<NavSupCenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavSupCenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSupCenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
