import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationUpdateComponent } from './delegation-update.component';

describe('DelegationUpdateComponent', () => {
  let component: DelegationUpdateComponent;
  let fixture: ComponentFixture<DelegationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
