import { ChangeDetectionStrategy, Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { GeolocationService } from '../../../features/collect/services/geolocation/geolocation.service';
import { EpochToTimePipe } from '../../pipes/epoch-to-time/epoch-to-time.pipe';

import type * as Leaflet from 'leaflet';

declare let L: typeof Leaflet;

const COMMON = [EpochToTimePipe];

const ZORRO = [
  NzAvatarModule,
  NzCardModule,
  NzIconModule,
  NzSwitchModule,
  NzSkeletonModule,
  NzDividerModule,
];

@Component({
  selector: 'app-geolocation',
  imports: [...ZORRO, ...COMMON],
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeolocationComponent implements OnInit, AfterViewInit {
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

        this.userMarker?.setLatLng([latitude, longitude]); // Atualiza a posição do marcador
      },
      error => {
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }
}
