import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationDeleteComponent } from './delegation-delete.component';

describe('DelegationDeleteComponent', () => {
  let component: DelegationDeleteComponent;
  let fixture: ComponentFixture<DelegationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
