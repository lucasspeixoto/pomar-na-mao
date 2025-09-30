import { TestBed } from '@angular/core/testing';
import { InspectRoutineStore } from './inspect-routine-store';

describe('InspectRoutineStore', () => {
  let service: InspectRoutineStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(InspectRoutineStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
