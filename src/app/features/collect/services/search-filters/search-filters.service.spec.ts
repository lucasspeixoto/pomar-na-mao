import { TestBed } from '@angular/core/testing';

import { SearchFiltersService } from './search-filters.service';
import { MessageService } from 'primeng/api';

describe('SearchFiltersService', () => {
  let service: SearchFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(SearchFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
