import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListSentComponent } from './document-list-sent.component';

describe('DocumentListSentComponent', () => {
  let component: DocumentListSentComponent;
  let fixture: ComponentFixture<DocumentListSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
