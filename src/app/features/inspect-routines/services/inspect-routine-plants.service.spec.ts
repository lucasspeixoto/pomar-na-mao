import { TestBed } from '@angular/core/testing';
import { InspectRoutinePlantsService } from './inspect-routine-plants.service';

describe('InspectRoutinePlantsService', () => {
  let service: InspectRoutinePlantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(InspectRoutinePlantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
