import { TestBed } from '@angular/core/testing';

import { SearchFiltersStore } from './search-filters-store';
import { MessageService } from 'primeng/api';

describe('SearchFiltersStore', () => {
  let service: SearchFiltersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(SearchFiltersStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
