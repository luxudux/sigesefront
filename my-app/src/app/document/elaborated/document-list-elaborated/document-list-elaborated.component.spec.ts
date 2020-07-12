import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListElaboratedComponent } from './document-list-elaborated.component';

describe('DocumentListElaboratedComponent', () => {
  let component: DocumentListElaboratedComponent;
  let fixture: ComponentFixture<DocumentListElaboratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListElaboratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListElaboratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
