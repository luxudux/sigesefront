import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStateSentComponent } from './document-state-sent.component';

describe('DocumentStateSentComponent', () => {
  let component: DocumentStateSentComponent;
  let fixture: ComponentFixture<DocumentStateSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentStateSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStateSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
