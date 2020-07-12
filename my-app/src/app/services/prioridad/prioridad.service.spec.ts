import { TestBed } from '@angular/core/testing';

import { PrioridadService } from './prioridad.service';

describe('PrioridadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrioridadService = TestBed.get(PrioridadService);
    expect(service).toBeTruthy();
  });
});
