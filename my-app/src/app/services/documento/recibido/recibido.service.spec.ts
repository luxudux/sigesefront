import { TestBed } from '@angular/core/testing';

import { RecibidoService } from './recibido.service';

describe('RecibidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecibidoService = TestBed.get(RecibidoService);
    expect(service).toBeTruthy();
  });
});
