import { ChangeDetectionStrategy, Component, inject, AfterViewInit, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';

import type * as Leaflet from 'leaflet';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { EpochToTimePipe } from 'src/app/pipes/epoch-to-time/epoch-to-time.pipe';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

declare let L: typeof Leaflet;

const PRIMENG = [CardModule, MessageModule, ButtonModule];

const PIPES = [EpochToTimePipe];

@Component({
  selector: 'app-collect-geolocation',
  imports: [...PRIMENG, ...PIPES],
  templateUrl: './collect-geolocation.component.html',
  styleUrl: './collect-geolocation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectGeolocationComponent implements OnInit, AfterViewInit {
  public currentDate = new Date();

  public geolocationService = inject(GeolocationService);

  public userMarker!: Leaflet.Marker;

  public map!: Leaflet.Map;

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

    this.map = L.map('map');

    navigator.geolocation.getCurrentPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.map.setView([latitude, longitude], 13); // Move o mapa para a nova posição

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map); // Cria um marcador para o usuário

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(this.map);
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
