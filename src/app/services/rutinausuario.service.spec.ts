import { TestBed } from '@angular/core/testing';

import { RutinausuarioService } from './rutinausuario.service';

describe('RutinausuarioService', () => {
  let service: RutinausuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinausuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
