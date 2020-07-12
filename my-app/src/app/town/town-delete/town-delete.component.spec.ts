import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownDeleteComponent } from './town-delete.component';

describe('TownDeleteComponent', () => {
  let component: TownDeleteComponent;
  let fixture: ComponentFixture<TownDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
