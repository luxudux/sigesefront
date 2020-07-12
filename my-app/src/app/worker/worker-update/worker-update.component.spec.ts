import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerUpdateComponent } from './worker-update.component';

describe('WorkerUpdateComponent', () => {
  let component: WorkerUpdateComponent;
  let fixture: ComponentFixture<WorkerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
