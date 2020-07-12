import { TestBed } from '@angular/core/testing';

import { DelegacionService } from './delegacion.service';

describe('DelegacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelegacionService = TestBed.get(DelegacionService);
    expect(service).toBeTruthy();
  });
});
