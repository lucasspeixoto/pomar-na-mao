import { TestBed } from '@angular/core/testing';

import { PlantFileService } from './plant-file.service';

describe('PlantFileService', () => {
  let service: PlantFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
