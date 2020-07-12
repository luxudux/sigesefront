import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFinishedComponent } from './document-finished.component';

describe('DocumentFinishedComponent', () => {
  let component: DocumentFinishedComponent;
  let fixture: ComponentFixture<DocumentFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
