import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitDeleteComponent } from './permit-delete.component';

describe('PermitDeleteComponent', () => {
  let component: PermitDeleteComponent;
  let fixture: ComponentFixture<PermitDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
