import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownUpdateComponent } from './town-update.component';

describe('TownUpdateComponent', () => {
  let component: TownUpdateComponent;
  let fixture: ComponentFixture<TownUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
