import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSentComponent } from './document-sent.component';

describe('DocumentSentComponent', () => {
  let component: DocumentSentComponent;
  let fixture: ComponentFixture<DocumentSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
