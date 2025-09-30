import { TestBed } from '@angular/core/testing';
import { InspectRoutinePlantsStore } from './inspect-routine-plants-store';

describe('InspectRoutinePlantsStore', () => {
  let service: InspectRoutinePlantsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(InspectRoutinePlantsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
