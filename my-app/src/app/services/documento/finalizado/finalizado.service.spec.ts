import { TestBed } from '@angular/core/testing';

import { FinalizadoService } from './finalizado.service';

describe('FinalizadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinalizadoService = TestBed.get(FinalizadoService);
    expect(service).toBeTruthy();
  });
});
