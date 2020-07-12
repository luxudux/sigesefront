import { TestBed } from '@angular/core/testing';

import { EnviadoService } from './enviado.service';

describe('EnviadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviadoService = TestBed.get(EnviadoService);
    expect(service).toBeTruthy();
  });
});
