import { TestBed } from '@angular/core/testing';

import { PosturasService } from './posturas.service';

describe('PosturasService', () => {
  let service: PosturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
