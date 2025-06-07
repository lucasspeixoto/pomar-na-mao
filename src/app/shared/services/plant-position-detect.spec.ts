import { TestBed } from '@angular/core/testing';

import { PlantPositionDetect } from './plant-position-detect';
import { MessageService } from 'primeng/api';

describe('PlantPositionDetect', () => {
  let service: PlantPositionDetect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(PlantPositionDetect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
