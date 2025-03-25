/* eslint-disable @typescript-eslint/no-explicit-any */
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationComponent } from './geolocation.component';
import { GeolocationService } from '../../../features/collect/services/geolocation/geolocation.service';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { EpochToTimePipe } from '../../pipes/epoch-to-time/epoch-to-time.pipe';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';

import * as L from 'leaflet';

const GEOLOCATION_SERVICE_MOCK = {
  isCoordinatesAvailable: signal(true),
  isLoading: signal(false),
  getLocaltionPermission: jest.fn(),
  getLocaltionCoordinate: jest.fn(),
  showUnavailableGeolocation: jest.fn(),
  coordinates: signal({
    latitude: -21.2074496,
    longitude: -47.775744,
  }),
  permissionStatus: signal({
    state: 'granted',
  } as PermissionStatus),
  coordinatesTimestamp: signal(1740401282767),
};

type NavigatorMock = {
  permissions: {
    query: jest.Mock;
  };
  geolocation: {
    watchPosition: jest.Mock;
    getCurrentPosition: jest.Mock;
  };
};

describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let fixture: ComponentFixture<GeolocationComponent>;
  let geolocationService: jest.Mocked<GeolocationService>;
  let mockNavigator: NavigatorMock;
  let mockPermissionsQuery: jest.Mock;
  let mockGeolocationWatchPosition: jest.Mock;
  let mockGeolocationCurrentPosition: jest.Mock;

  beforeAll(() => {
    (global as any).L = L; // Ensure L is globally available
  });

  beforeEach(() => {
    // Mock navigator.permissions.query
    mockPermissionsQuery = jest.fn();

    // Mock navigator.geolocation.watchPosition
    mockGeolocationWatchPosition = jest.fn();

    // Mock navigator.geolocation.watchPosition
    mockGeolocationCurrentPosition = jest.fn();

    // Create a mock navigator object
    mockNavigator = {
      permissions: {
        query: mockPermissionsQuery,
      },
      geolocation: {
        watchPosition: mockGeolocationWatchPosition,
        getCurrentPosition: mockGeolocationCurrentPosition,
      },
    };

    // Replace the global navigator with our mock
    Object.defineProperty(global, 'navigator', {
      value: mockNavigator,
      writable: true,
    });

    // Mock setTimeout
    jest.useFakeTimers();

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NzAvatarModule,
        NzCardModule,
        NzIconModule,
        NzSwitchModule,
        NzSkeletonModule,
        EpochToTimePipe,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: GeolocationService, useValue: GEOLOCATION_SERVICE_MOCK },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationComponent);
    component = fixture.componentInstance;

    geolocationService = TestBed.inject(GeolocationService) as jest.Mocked<GeolocationService>;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call GeolocationService getLocaltionPermission and getLocaltionCoordinate methods', () => {
    expect(geolocationService.getLocaltionCoordinate).toHaveBeenCalled();
    expect(geolocationService.getLocaltionCoordinate).toHaveBeenCalled();
  });

  describe('visibility', () => {
    it('should render longitude', () => {
      const longitudeElement = fixture.nativeElement.querySelector('#longitude');

      expect(longitudeElement).toBeTruthy();
      expect(longitudeElement.textContent).toContain('-47.775744');
    });

    it('should render latitude', () => {
      const latitudeElement = fixture.nativeElement.querySelector('#latitude');

      expect(latitudeElement).toBeTruthy();
      expect(latitudeElement.textContent).toContain('-21.2074496');
    });
  });
});
