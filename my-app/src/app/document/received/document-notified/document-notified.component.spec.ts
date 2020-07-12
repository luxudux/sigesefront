import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentNotifiedComponent } from './document-notified.component';

describe('DocumentNotifiedComponent', () => {
  let component: DocumentNotifiedComponent;
  let fixture: ComponentFixture<DocumentNotifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentNotifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentNotifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
