/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';

describe('Service: Geolocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationService],
    });
  });

  it('should create service', inject([GeolocationService], (service: GeolocationService) => {
    expect(service).toBeTruthy();
  }));
});
