import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSecretaryComponent } from './main-secretary.component';

describe('MainSecretaryComponent', () => {
  let component: MainSecretaryComponent;
  let fixture: ComponentFixture<MainSecretaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSecretaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
