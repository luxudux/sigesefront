import { TestBed } from '@angular/core/testing';

import { ElaboradoService } from './elaborado.service';

describe('ElaboradoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElaboradoService = TestBed.get(ElaboradoService);
    expect(service).toBeTruthy();
  });
});
