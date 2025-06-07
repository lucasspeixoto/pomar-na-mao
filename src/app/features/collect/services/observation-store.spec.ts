import { TestBed } from '@angular/core/testing';
import { ObservationStore } from './observation-store';

describe('ObservationStore', () => {
  let service: ObservationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservationStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
