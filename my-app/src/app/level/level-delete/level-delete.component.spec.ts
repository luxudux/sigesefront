import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelDeleteComponent } from './level-delete.component';

describe('LevelDeleteComponent', () => {
  let component: LevelDeleteComponent;
  let fixture: ComponentFixture<LevelDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
