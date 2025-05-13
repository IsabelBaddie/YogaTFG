import { TestBed } from '@angular/core/testing';

import { PosturarutinaService } from './posturarutina.service';

describe('PosturarutinaService', () => {
  let service: PosturarutinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosturarutinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
