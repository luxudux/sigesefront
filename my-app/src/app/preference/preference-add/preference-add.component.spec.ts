import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceAddComponent } from './preference-add.component';

describe('PreferenceAddComponent', () => {
  let component: PreferenceAddComponent;
  let fixture: ComponentFixture<PreferenceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
