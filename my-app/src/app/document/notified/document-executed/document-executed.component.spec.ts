import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExecutedComponent } from './document-executed.component';

describe('DocumentExecutedComponent', () => {
  let component: DocumentExecutedComponent;
  let fixture: ComponentFixture<DocumentExecutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentExecutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentExecutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
