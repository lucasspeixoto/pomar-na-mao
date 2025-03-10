import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';

type NavigatorMock = {
  permissions: {
    query: jest.Mock;
  };
  geolocation: {
    getCurrentPosition: jest.Mock;
  };
};

describe('GeolocationService', () => {
  let service: GeolocationService;
  let mockNavigator: NavigatorMock;
  let mockPermissionsQuery: jest.Mock;
  let mockGeolocationGetCurrentPosition: jest.Mock;

  beforeEach(() => {
    // Mock navigator.permissions.query
    mockPermissionsQuery = jest.fn();

    // Mock navigator.geolocation.getCurrentPosition
    mockGeolocationGetCurrentPosition = jest.fn();

    // Create a mock navigator object
    mockNavigator = {
      permissions: {
        query: mockPermissionsQuery,
      },
      geolocation: {
        getCurrentPosition: mockGeolocationGetCurrentPosition,
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
      providers: [GeolocationService],
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

      mockGeolocationGetCurrentPosition.mockImplementation(success => {
        success(mockPosition);
      });

      // Act
      await service.getLocaltionCoordinate();

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

    it('should set error message and throw error when geolocation fails', async () => {
      // Arrange
      const errorMessage = 'Geolocation failed';
      mockGeolocationGetCurrentPosition.mockImplementation((_, error) => {
        error(new Error(errorMessage));
      });

      // Act & Assert
      await expect(service.getLocaltionCoordinate()).rejects.toThrow(
        `Erro ao obter localização: ${errorMessage}`
      );
      expect(service.geolocationErrorMessage()).toBe(errorMessage);
    });

    it('should pass correct options to getCurrentPosition', async () => {
      // Arrange
      mockGeolocationGetCurrentPosition.mockImplementation(success => {
        success({ coords: { latitude: 0, longitude: 0 }, timestamp: 0 });
      });

      // Act
      await service.getLocaltionCoordinate();

      // Assert
      expect(mockGeolocationGetCurrentPosition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        { enableHighAccuracy: true, maximumAge: 3600000 }
      );
    });
  });
});
