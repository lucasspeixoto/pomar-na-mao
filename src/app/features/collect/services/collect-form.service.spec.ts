import { TestBed } from '@angular/core/testing';

import { CollectFormService } from './collect-form.service';

describe('CollectFormService', () => {
  let service: CollectFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
