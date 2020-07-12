import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListExecutedComponent } from './document-list-executed.component';

describe('DocumentListExecutedComponent', () => {
  let component: DocumentListExecutedComponent;
  let fixture: ComponentFixture<DocumentListExecutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListExecutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListExecutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
