import { TestBed } from '@angular/core/testing';
import { PlantsStore } from './plants-store';
import { MessageService } from 'primeng/api';

describe('PlantsStore', () => {
  let service: PlantsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(PlantsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
