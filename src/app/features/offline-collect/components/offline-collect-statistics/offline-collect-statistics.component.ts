import { ConnectivityService } from './../../../../shared/services/connectivity/connectivity.service';
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, AfterViewInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';

import type * as Leaflet from 'leaflet';

declare let L: typeof Leaflet;

const ZORRO = [NzGridModule, NzButtonModule, NzCardModule];

const COMMON = [DatePipe, NgClass];

@Component({
  selector: 'app-offline-collect-statistics',
  imports: [...ZORRO, ...COMMON],
  templateUrl: './offline-collect-statistics.component.html',
  styleUrls: ['./offline-collect-statistics.component.scss'],
})
export class OfflineCollectStatisticsComponent implements AfterViewInit {
  public currentDate = new Date();

  public geolocationService = inject(GeolocationService);

  public connectivityService = inject(ConnectivityService);

  public userMarker!: Leaflet.Marker;

  public map!: Leaflet.Map;

  public isLocationAvailable = signal(false);

  public ngAfterViewInit(): void {
    if (!navigator.geolocation) {
      console.warn('Localização indisponível neste dispositivo!');
      this.geolocationService.showUnavailableGeolocation();
    }

    this.map = L.map('map');

    navigator.geolocation.getCurrentPosition(
      position => {
        this.isLocationAvailable.set(true);

        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.map.setView([latitude, longitude], 13); // Move o mapa para a nova posição

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map); // Cria um marcador para o usuário

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(this.map);
      },
      error => {
        this.isLocationAvailable.set(false);
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    navigator.geolocation.watchPosition(
      position => {
        this.isLocationAvailable.set(true);

        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.userMarker.setLatLng([latitude, longitude]); // Atualiza a posição do marcador
      },
      error => {
        this.isLocationAvailable.set(false);
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }
}
