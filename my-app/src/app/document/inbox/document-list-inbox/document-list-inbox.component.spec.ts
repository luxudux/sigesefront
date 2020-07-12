import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListInboxComponent } from './document-list-inbox.component';

describe('DocumentListInboxComponent', () => {
  let component: DocumentListInboxComponent;
  let fixture: ComponentFixture<DocumentListInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
