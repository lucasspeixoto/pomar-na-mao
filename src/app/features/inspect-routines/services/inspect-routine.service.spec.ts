import { TestBed } from '@angular/core/testing';
import { InspectRoutineService } from './inspect-routine.service';

describe('InspectRoutineService', () => {
  let service: InspectRoutineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(InspectRoutineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
