import { ChangeDetectionStrategy, Component, inject, AfterViewInit, OnInit } from '@angular/core';

import type * as Leaflet from 'leaflet';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { ButtonModule } from 'primeng/button';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-collect-search-map',
  imports: [ButtonModule],
  templateUrl: './collect-search-map.component.html',
  styleUrl: './collect-search-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectSearchMapComponent implements OnInit, AfterViewInit {
  public geolocationService = inject(GeolocationService);

  public userMarker!: Leaflet.Marker;

  public map2!: Leaflet.Map;

  public ngOnInit(): void {
    this.loadGeolocationData();
  }

  public loadGeolocationData(): void {
    this.geolocationService.getLocaltionPermission();
    this.geolocationService.getLocaltionCoordinate();
  }

  public ngAfterViewInit(): void {
    if (!navigator.geolocation) {
      console.warn('Localização indisponível neste dispositivo!');
      this.geolocationService.showUnavailableGeolocation();
    }

    this.map2 = L.map('map2');

    navigator.geolocation.getCurrentPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.map2.setView([latitude, longitude], 13); // Move o mapa para a nova posição

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map2); // Cria um marcador para o usuário

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(this.map2);
      },
      error => {
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    navigator.geolocation.watchPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.userMarker?.setLatLng([latitude, longitude]);
      },
      error => {
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
