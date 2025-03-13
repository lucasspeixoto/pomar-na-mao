import { computed, inject, Injectable, signal } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

type Coordinate = {
  latitude: number;
  longitude: number;
};

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  public geolocationErrorMessage = signal<string>('');

  public permissionStatus = signal<PermissionStatus | null>(null);

  private notificationService = inject(NzNotificationService);

  /**
   * Computed signal that returns the current state of the geolocation permission.
   * @returns {'granted' | 'prompt' | 'denied'} The permission state:
   *  - 'granted': User has allowed geolocation access
   *  - 'prompt': User hasn't made a choice yet
   *  - 'denied': User has blocked geolocation access
   */
  public permissionStatusState = computed(() => this.permissionStatus()!.state);

  public coordinates = signal<Coordinate | null>(null);

  public coordinatesTimestamp = signal<EpochTimeStamp | null>(null);

  public isLoading = signal(false);

  public isCoordinatesAvailable = computed(() => {
    return this.permissionStatusState() === 'granted' && this.coordinates;
  });

  public async getLocaltionPermission(): Promise<void> {
    this.isLoading.set(true);

    await navigator.permissions
      .query({ name: 'geolocation' })
      .then(result => this.permissionStatus.set(result))
      .catch(error => {
        const { message } = error;

        this.geolocationErrorMessage.set(message);

        throw new Error(`Erro ao obter estado de conexão do dispositivo: ${error.message}`);
      });

    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  public async getLocaltionCoordinate(): Promise<void> {
    this.isLoading.set(true);

    navigator.geolocation.getCurrentPosition(
      position => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        } as Coordinate;

        this.coordinates.set(coordinates);
        this.coordinatesTimestamp.set(position.timestamp);
      },
      error => {
        const { message } = error;

        this.geolocationErrorMessage.set(message);

        throw new Error(`Erro ao obter localização: ${error.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 3600000 } // Cache location for 1 hour
    );

    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  public getUserLatitudeAndLongitude(position: GeolocationPosition): number[] {
    const { latitude, longitude } = position.coords;
    return [latitude, longitude];
  }

  public handleGeolocationError(error: GeolocationPositionError): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.warn('O usuário negou a solicitação de geolocalização.');
        this.notificationService.error(
          'Erro',
          'Acesso à localização negado. Ative o GPS nas configurações do navegador.'
        );
        break;
      case error.POSITION_UNAVAILABLE:
        console.warn('As informações de localização não estão disponíveis.');
        this.notificationService.error(
          'Erro',
          'Não foi possível determinar sua localização. Tente novamente mais tarde.'
        );
        break;
      case error.TIMEOUT:
        console.warn('A solicitação para obter a localização expirou.');
        this.notificationService.error(
          'Erro',
          'Tempo limite excedido ao tentar obter a localização. Vá para uma área aberta e tente novamente.'
        );
        break;
      default:
        console.warn('Ocorreu um erro desconhecido.');
        this.notificationService.error(
          'Erro',
          'Ocorreu um erro inesperado ao obter a localização.'
        );
        break;
    }
  }

  public showUnavailableGeolocation(): void {
    this.notificationService.warning('GPS', 'Localização indisponível neste dispositivo!');
  }
}
