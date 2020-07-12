import { TestBed } from '@angular/core/testing';

import { NotificadoService } from './notificado.service';

describe('NotificadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificadoService = TestBed.get(NotificadoService);
    expect(service).toBeTruthy();
  });
});
