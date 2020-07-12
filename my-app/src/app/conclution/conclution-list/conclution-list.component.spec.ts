import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclutionListComponent } from './conclution-list.component';

describe('ConclutionListComponent', () => {
  let component: ConclutionListComponent;
  let fixture: ComponentFixture<ConclutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclutionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
