/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { CollectStepService } from './collect-step.service';

describe('CollectStepService', () => {
  let service: CollectStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectStepService],
    });

    service = TestBed.inject(CollectStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
