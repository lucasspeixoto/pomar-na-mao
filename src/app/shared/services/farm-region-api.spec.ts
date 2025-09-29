import { TestBed } from '@angular/core/testing';

import { FarmRegionApi } from './farm-region-api';

describe('FarmRegionApi', () => {
  let service: FarmRegionApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(FarmRegionApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
