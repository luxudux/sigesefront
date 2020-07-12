import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclutionDeleteComponent } from './conclution-delete.component';

describe('ConclutionDeleteComponent', () => {
  let component: ConclutionDeleteComponent;
  let fixture: ComponentFixture<ConclutionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclutionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclutionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
