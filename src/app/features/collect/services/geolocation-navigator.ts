import { computed, Injectable, signal } from '@angular/core';

type Coordinate = {
  latitude: number;
  longitude: number;
};

@Injectable({
  providedIn: 'root',
})
export class GeolocationNavigator {
  public geolocationErrorMessage = signal<string>('');

  public permissionStatus = signal<PermissionStatus | null>(null);

  /**
   * Computed signal that returns the current state of the geolocation permission.
   * @returns {'granted' | 'prompt' | 'denied'} The permission state:
   *  - 'granted': User has allowed geolocation access
   *  - 'prompt': User hasn't made a choice yet
   *  - 'denied': User has blocked geolocation access
   */
  public permissionStatusState = computed(() => {
    return this.permissionStatus() ? this.permissionStatus()!.state : 'denied';
  });

  public coordinates = signal<Coordinate | null>(null);

  public coordinatesTimestamp = signal<EpochTimeStamp | null>(null);

  public isLoading = signal(false);

  public isCoordinatesAvailable = computed(() => {
    return this.coordinates() ? true : false;
  });

  public isPermissionGranted = computed(() => {
    return this.permissionStatusState() === 'granted' ? true : false;
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

    this.isLoading.set(false);
  }

  public getLocaltionCoordinate(): void {
    this.isLoading.set(true);

    navigator.geolocation.watchPosition(
      position => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        } as Coordinate;

        this.coordinates.set(coordinates);
        this.coordinatesTimestamp.set(position.timestamp);
      },
      this.handleGeolocationError,
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );

    this.isLoading.set(false);
  }

  public getUserLatitudeAndLongitude(position: GeolocationPosition): number[] {
    const { latitude, longitude } = position.coords;
    return [latitude, longitude];
  }

  public handleGeolocationError(error: GeolocationPositionError): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.warn('O usuário negou a solicitação de geolocalização!');
        break;
      case error.POSITION_UNAVAILABLE:
        console.warn('As informações de localização não estão disponíveis!');
        break;
      case error.TIMEOUT:
        console.warn('A solicitação para obter a localização expirou!');
        break;
      default:
        console.warn('Ocorreu um erro desconhecido!');
        break;
    }
  }

  public showUnavailableGeolocation(): void {
    console.warn('Localização indisponível neste dispositivo!');
  }
}
