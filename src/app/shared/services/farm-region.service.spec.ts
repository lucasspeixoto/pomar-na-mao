import { TestBed } from '@angular/core/testing';

import { FarmRegionService } from './farm-region.service';

describe('FarmRegionService', () => {
  let service: FarmRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(FarmRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
