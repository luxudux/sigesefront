import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSupDerComponent } from './nav-sup-der.component';

describe('NavSupDerComponent', () => {
  let component: NavSupDerComponent;
  let fixture: ComponentFixture<NavSupDerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavSupDerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSupDerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
