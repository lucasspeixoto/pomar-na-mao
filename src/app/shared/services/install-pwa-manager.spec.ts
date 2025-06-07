import { TestBed } from '@angular/core/testing';
import { InstallPwaManager } from './install-pwa-manager';

describe('InstallPwaManager', () => {
  let service: InstallPwaManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallPwaManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
