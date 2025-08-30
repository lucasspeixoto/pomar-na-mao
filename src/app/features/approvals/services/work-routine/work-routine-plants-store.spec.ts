import { TestBed } from '@angular/core/testing';

import { MessageService } from 'primeng/api';
import { WorkRoutinePlantsStore } from './work-routine-plants-store';

describe('WorkRoutinePlantsStore', () => {
  let service: WorkRoutinePlantsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(WorkRoutinePlantsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
