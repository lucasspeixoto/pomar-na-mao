import { TestBed } from '@angular/core/testing';
import { UpdateService } from './update.service';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { Subject, of } from 'rxjs';

describe('UpdateService', () => {
  let service: UpdateService;
  let swUpdateMock: jest.Mocked<SwUpdate>;
  let versionUpdatesSubject: Subject<VersionEvent>;
  let unrecoverableSubject: Subject<VersionEvent>;

  beforeEach(async () => {
    versionUpdatesSubject = new Subject<VersionEvent>();
    unrecoverableSubject = new Subject();

    swUpdateMock = {
      available: of({}),
      activateUpdate: jest.fn().mockResolvedValue(true),
      isEnabled: true,
      versionUpdates: versionUpdatesSubject.asObservable(),
      unrecoverable: unrecoverableSubject.asObservable(),
      checkForUpdate: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<SwUpdate>;

    TestBed.configureTestingModule({
      providers: [UpdateService, { provide: SwUpdate, useValue: swUpdateMock }],
    });
    service = TestBed.inject(UpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
