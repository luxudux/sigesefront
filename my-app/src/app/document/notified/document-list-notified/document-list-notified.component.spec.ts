import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListNotifiedComponent } from './document-list-notified.component';

describe('DocumentListNotifiedComponent', () => {
  let component: DocumentListNotifiedComponent;
  let fixture: ComponentFixture<DocumentListNotifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListNotifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListNotifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
