import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListReceivedComponent } from './document-list-received.component';

describe('DocumentListReceivedComponent', () => {
  let component: DocumentListReceivedComponent;
  let fixture: ComponentFixture<DocumentListReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
