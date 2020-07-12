import { TestBed } from '@angular/core/testing';

import { LlamadaService } from './llamada.service';

describe('LlamadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LlamadaService = TestBed.get(LlamadaService);
    expect(service).toBeTruthy();
  });
});
