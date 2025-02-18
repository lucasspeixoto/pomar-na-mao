import { computed, Injectable, signal } from '@angular/core';

type Coordinate = {
  latitude: number;
  longitude: number;
  altitude: number;
};

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  public geolocationErrorMessage = signal<string>('');

  public permissionStatus = signal<PermissionStatus | null>(null);

  /**
   * Computed signal that returns the current state of the geolocation permission.
   * @returns {'granted' | 'prompt' | 'denied'} The permission state:
   *  - 'granted': User has allowed geolocation access
   *  - 'prompt': User hasn't made a choice yet
   *  - 'denied': User has blocked geolocation access
   */
  public permissionStatusState = computed(() => this.permissionStatus()!.state);

  public coordinates = signal<Coordinate | null>(null);

  public isLoading = signal(false);

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

  public async getLocaltionCoordinate(): Promise<void> {
    this.isLoading.set(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude || 'Não disponível',
        } as Coordinate;

        this.coordinates.set(coordinates);
      },
      error => {
        const { message } = error;

        this.geolocationErrorMessage.set(message);

        throw new Error(`Erro ao obter localização: ${error.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 3600000 } // Cache location for 1 hour
    );

    this.isLoading.set(false);
  }
}
