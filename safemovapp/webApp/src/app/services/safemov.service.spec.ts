import { TestBed } from '@angular/core/testing';

import { SafemovService } from './safemov.service';

describe('SafemovService', () => {
  let service: SafemovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafemovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
