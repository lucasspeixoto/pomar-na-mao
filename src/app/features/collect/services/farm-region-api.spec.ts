import { TestBed } from '@angular/core/testing';

import { FarmRegionApi } from './farm-region-api';
import { MessageService } from 'primeng/api';

describe('FarmRegionApi', () => {
  let service: FarmRegionApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(FarmRegionApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
