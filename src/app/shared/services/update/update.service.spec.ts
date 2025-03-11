import { TestBed } from '@angular/core/testing';
import { UpdateService } from './update.service';
import { SwUpdate } from '@angular/service-worker';

describe('UpdateService', () => {
  let service: UpdateService;
  let swUpdateMock: jest.Mocked<SwUpdate>;

  beforeEach(() => {
    swUpdateMock = {
      available: jest.fn(),
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
