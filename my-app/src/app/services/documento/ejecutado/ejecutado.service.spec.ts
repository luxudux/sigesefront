import { TestBed } from '@angular/core/testing';

import { EjecutadoService } from './ejecutado.service';

describe('EjecutadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EjecutadoService = TestBed.get(EjecutadoService);
    expect(service).toBeTruthy();
  });
});
