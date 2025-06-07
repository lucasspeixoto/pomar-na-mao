import { TestBed } from '@angular/core/testing';

import { GeolocationStore } from './geolocation-store';

describe('GeolocationStore', () => {
  let service: GeolocationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
