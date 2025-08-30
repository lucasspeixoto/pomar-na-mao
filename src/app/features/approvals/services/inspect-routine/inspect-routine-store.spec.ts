import { TestBed } from '@angular/core/testing';
import { InspectRoutineStore } from './inspect-routine-store';
import { MessageService } from 'primeng/api';

describe('InspectRoutineStore', () => {
  let service: InspectRoutineStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(InspectRoutineStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
