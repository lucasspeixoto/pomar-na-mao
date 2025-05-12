import { TestBed } from '@angular/core/testing';

import { GeolocationFormService } from './geolocation-form.service';

describe('GeolocationFormService', () => {
  let service: GeolocationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
