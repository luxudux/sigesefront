import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclutionUpdateComponent } from './conclution-update.component';

describe('ConclutionUpdateComponent', () => {
  let component: ConclutionUpdateComponent;
  let fixture: ComponentFixture<ConclutionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclutionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclutionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
