import { TestBed } from '@angular/core/testing';

import { CollectSearchFiltersService } from './collect-search-filters.service';
import { MessageService } from 'primeng/api';

describe('CollectSearchFiltersService', () => {
  let service: CollectSearchFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(CollectSearchFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
