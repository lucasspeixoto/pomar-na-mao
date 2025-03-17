/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationComponent } from './geolocation.component';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
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

const GEOLOCATION_SERVICE_MOCK = {
  isCoordinatesAvailable: signal(true),
  isLoading: signal(false),
  getLocaltionPermission: jest.fn(),
  getLocaltionCoordinate: jest.fn(),
  coordinates: signal({
    latitude: -21.2074496,
    longitude: -47.775744,
  }),
  permissionStatus: signal({
    state: 'granted',
  } as PermissionStatus),
  coordinatesTimestamp: signal(1740401282767),
};

describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let fixture: ComponentFixture<GeolocationComponent>;
  let geolocationService: jest.Mocked<GeolocationService>;

  beforeEach(() => {
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

    /* it('should render timestamp', () => {
      const timestampElement = fixture.nativeElement.querySelector('#timestamp');

      expect(timestampElement).toBeTruthy();
      expect(timestampElement.textContent).toContain('09h:48m:02s');
    }); */

    it('should render Atualizar for coordinates available', () => {
      const gpsUpdateElement = fixture.nativeElement.querySelector('#gpsUpdate');
      const gpsActiveElement = fixture.nativeElement.querySelector('#gpsActive');

      expect(gpsActiveElement).not.toBeTruthy();
      expect(gpsUpdateElement).toBeTruthy();
      expect(gpsUpdateElement.textContent).toContain('Atualizar');
    });
  });
});
