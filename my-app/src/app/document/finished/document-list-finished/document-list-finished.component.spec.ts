import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListFinishedComponent } from './document-list-finished.component';

describe('DocumentListFinishedComponent', () => {
  let component: DocumentListFinishedComponent;
  let fixture: ComponentFixture<DocumentListFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
