/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ConnectivityService } from './connectivity.service';

describe('Service: Connectivity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectivityService],
    });
  });

  it('should ...', inject([ConnectivityService], (service: ConnectivityService) => {
    expect(service).toBeTruthy();
  }));
});
