import { TestBed } from '@angular/core/testing';
import { ObservationDataService } from './observation-data.service';

describe('ObservationDataService', () => {
  let service: ObservationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
