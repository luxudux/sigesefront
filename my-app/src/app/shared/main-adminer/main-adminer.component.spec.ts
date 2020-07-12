import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminerComponent } from './main-adminer.component';

describe('MainAdminerComponent', () => {
  let component: MainAdminerComponent;
  let fixture: ComponentFixture<MainAdminerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAdminerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
