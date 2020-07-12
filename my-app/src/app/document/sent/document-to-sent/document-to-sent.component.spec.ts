import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentToSentComponent } from './document-to-sent.component';

describe('DocumentToSentComponent', () => {
  let component: DocumentToSentComponent;
  let fixture: ComponentFixture<DocumentToSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentToSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentToSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
