import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReceivedComponent } from './document-received.component';

describe('DocumentReceivedComponent', () => {
  let component: DocumentReceivedComponent;
  let fixture: ComponentFixture<DocumentReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
