import { TestBed } from '@angular/core/testing';

import { InstallPwaServiceService } from '../install-pwa-service.service';

describe('InstallPwaServiceService', () => {
  let service: InstallPwaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallPwaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
