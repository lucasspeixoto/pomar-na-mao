import { TestBed } from '@angular/core/testing';
import { WorkRoutineStore } from './work-routine-store';
import { MessageService } from 'primeng/api';

describe('WorkRoutineStore', () => {
  let service: WorkRoutineStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(WorkRoutineStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
