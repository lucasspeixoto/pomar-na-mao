/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ConnectivityStatus } from './connectivity-status';

describe('ConnectivityStatus', () => {
  let service: ConnectivityStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectivityStatus],
    });
    service = TestBed.inject(ConnectivityStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
