import { TestBed } from '@angular/core/testing';

import { AutenticaService } from './autentica.service';

describe('AutenticaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticaService = TestBed.get(AutenticaService);
    expect(service).toBeTruthy();
  });
});
