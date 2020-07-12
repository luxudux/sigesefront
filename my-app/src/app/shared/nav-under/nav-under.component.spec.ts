import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUnderComponent } from './nav-under.component';

describe('NavUnderComponent', () => {
  let component: NavUnderComponent;
  let fixture: ComponentFixture<NavUnderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavUnderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUnderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
