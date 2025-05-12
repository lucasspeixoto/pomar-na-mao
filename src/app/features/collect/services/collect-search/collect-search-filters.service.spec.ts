import { TestBed } from '@angular/core/testing';

import { CollectSearchFiltersService } from './collect-search-filters.service';

describe('CollectSearchFiltersService', () => {
  let service: CollectSearchFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectSearchFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
