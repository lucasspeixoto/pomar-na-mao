/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SynchronizeService } from './synchronize.service';

describe('Service: Synchronize', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynchronizeService],
    });
  });

  it('should ...', inject([SynchronizeService], (service: SynchronizeService) => {
    expect(service).toBeTruthy();
  }));
});
