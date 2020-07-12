import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeUpdateComponent } from './office-update.component';

describe('OfficeUpdateComponent', () => {
  let component: OfficeUpdateComponent;
  let fixture: ComponentFixture<OfficeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
