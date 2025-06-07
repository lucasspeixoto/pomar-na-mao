import { TestBed } from '@angular/core/testing';

import { ComplementStore } from './complement-store';

describe('ComplementStore', () => {
  let service: ComplementStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplementStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
