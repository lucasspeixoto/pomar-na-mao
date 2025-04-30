import { TestBed } from '@angular/core/testing';

import { FarmRegionService } from './farm-region.service';
import { MessageService } from 'primeng/api';

describe('FarmRegionService', () => {
  let service: FarmRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(FarmRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
