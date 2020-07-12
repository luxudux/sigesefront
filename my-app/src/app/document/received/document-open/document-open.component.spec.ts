import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentOpenComponent } from './document-open.component';

describe('DocumentOpenComponent', () => {
  let component: DocumentOpenComponent;
  let fixture: ComponentFixture<DocumentOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
