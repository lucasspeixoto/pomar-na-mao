import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

type NavigatorMock = {
  permissions: {
    query: jest.Mock;
  };
  geolocation: {
    watchPosition: jest.Mock;
  };
};

describe('GeolocationService', () => {
  let service: GeolocationService;
  let mockNavigator: NavigatorMock;
  let mockPermissionsQuery: jest.Mock;
  let mockGeolocationWatchPosition: jest.Mock;

  beforeEach(() => {
    // Mock navigator.permissions.query
    mockPermissionsQuery = jest.fn();

    // Mock navigator.geolocation.watchPosition
    mockGeolocationWatchPosition = jest.fn();

    // Create a mock navigator object
    mockNavigator = {
      permissions: {
        query: mockPermissionsQuery,
      },
      geolocation: {
        watchPosition: mockGeolocationWatchPosition,
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
      providers: [
        GeolocationService,
        { provide: NzNotificationService, useValue: { error: jest.fn() } },
      ],
    });

    service = TestBed.inject(GeolocationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocaltionPermission', () => {
    it('should set permissionStatus when permission is granted', async () => {
      // Arrange
      const mockPermissionStatus = { state: 'granted' } as PermissionStatus;

      mockPermissionsQuery.mockResolvedValue(mockPermissionStatus);

      // Act
      const promise = service.getLocaltionPermission();

      // Assert
      await promise;
      expect(service.permissionStatus()).toEqual(mockPermissionStatus);
      expect(service.isLoading()).toBe(true);

      // Fast-forward timer
      jest.advanceTimersByTime(2000);
      expect(service.isLoading()).toBe(false);
    });

    it('should set permissionStatus when permission is denied', async () => {
      // Arrange
      const mockPermissionStatus = { state: 'denied' } as PermissionStatus;
      mockPermissionsQuery.mockResolvedValue(mockPermissionStatus);

      // Act
      const promise = service.getLocaltionPermission();

      // Assert
      await promise;
      expect(service.permissionStatus()).toEqual(mockPermissionStatus);
    });

    it('should set error message and throw error when permissions query fails', async () => {
      // Arrange
      const errorMessage = 'Permission query failed';
      mockPermissionsQuery.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.getLocaltionPermission()).rejects.toThrow(
        `Erro ao obter estado de conexão do dispositivo: ${errorMessage}`
      );
      expect(service.geolocationErrorMessage()).toBe(errorMessage);
    });
  });

  describe('getLocaltionCoordinate', () => {
    it('should set coordinates and timestamp when geolocation is successful', async () => {
      // Arrange
      const mockPosition = {
        coords: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        timestamp: 1234567890,
      };

      mockGeolocationWatchPosition.mockImplementation(success => {
        success(mockPosition);
      });

      // Act
      service.getLocaltionCoordinate();

      // Assert
      expect(service.coordinates()).toEqual({
        latitude: 40.7128,
        longitude: -74.006,
      });
      expect(service.coordinatesTimestamp()).toBe(1234567890);
      expect(service.isLoading()).toBe(true);

      // Fast-forward timer
      jest.advanceTimersByTime(2000);
      expect(service.isLoading()).toBe(false);
    });

    /* it('should set error message and throw error when geolocation fails', async () => {
      // Arrange
      const errorMessage = 'Geolocation failed';
      mockGeolocationWatchPosition.mockImplementation((_, error) => {
        error({ code: 1 });
      });

      // Act & Assert
      await expect(service.getLocaltionCoordinate()).rejects.toThrow(
        `Erro ao obter localização: ${errorMessage}`
      );
      expect(service.geolocationErrorMessage()).toBe(errorMessage);
    }); */

    it('should pass correct options to watchPosition', async () => {
      // Arrange
      mockGeolocationWatchPosition.mockImplementation(success => {
        success({ coords: { latitude: 0, longitude: 0 }, timestamp: 0 });
      });

      // Act
      service.getLocaltionCoordinate();

      // Assert
      expect(mockGeolocationWatchPosition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  });
});
