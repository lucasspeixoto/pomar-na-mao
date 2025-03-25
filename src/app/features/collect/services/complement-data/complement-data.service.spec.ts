import { TestBed } from '@angular/core/testing';

import { ComplementDataService } from './complement-data.service';

describe('ComplementDataService', () => {
  let service: ComplementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplementDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
