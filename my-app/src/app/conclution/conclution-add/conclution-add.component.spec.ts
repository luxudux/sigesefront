import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclutionAddComponent } from './conclution-add.component';

describe('ConclutionAddComponent', () => {
  let component: ConclutionAddComponent;
  let fixture: ComponentFixture<ConclutionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclutionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclutionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
