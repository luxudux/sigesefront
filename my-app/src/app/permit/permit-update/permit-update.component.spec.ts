import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitUpdateComponent } from './permit-update.component';

describe('PermitUpdateComponent', () => {
  let component: PermitUpdateComponent;
  let fixture: ComponentFixture<PermitUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
