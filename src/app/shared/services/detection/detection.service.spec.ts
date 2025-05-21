import { TestBed } from '@angular/core/testing';

import { DetectionService } from './detection.service';
import { MessageService } from 'primeng/api';

describe('DetectionService', () => {
  let service: DetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(DetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
