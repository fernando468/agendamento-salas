import { TestBed } from '@angular/core/testing';

import { CriarContaService } from './criar-conta-service';

describe('CriarContaService', () => {
  let service: CriarContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
