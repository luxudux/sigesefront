import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitAddComponent } from './permit-add.component';

describe('PermitAddComponent', () => {
  let component: PermitAddComponent;
  let fixture: ComponentFixture<PermitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
