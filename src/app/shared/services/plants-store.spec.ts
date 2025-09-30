import { TestBed } from '@angular/core/testing';
import { PlantsStore } from './plants-store';

describe('PlantsStore', () => {
  let service: PlantsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(PlantsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
