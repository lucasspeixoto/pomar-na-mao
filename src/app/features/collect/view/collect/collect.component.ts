/* eslint-disable prefer-const */
import { ChangeDetectionStrategy, Component, inject, AfterViewInit } from '@angular/core';
import { PlantUploadComponent } from '../../components/plant-upload/plant-upload.component';
import { GeolocationComponent } from '../../components/geolocation/geolocation.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ComplementDataComponent } from '../../components/complement-data/complement-data.component';

import type * as Leaflet from 'leaflet';

import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';

declare let L: typeof Leaflet;

const ZORRO = [NzGridModule];

const COMPONENTS = [PlantUploadComponent, GeolocationComponent, ComplementDataComponent];

@Component({
  selector: 'app-collect',
  imports: [...COMPONENTS, ...ZORRO],
  templateUrl: './collect.component.html',
  styleUrl: './collect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectComponent implements AfterViewInit {
  private geolocationService = inject(GeolocationService);

  public userMarker!: Leaflet.Marker;

  public map!: Leaflet.Map;

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
      this.geolocationService.handleGeolocationError,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    navigator.geolocation.watchPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.userMarker.setLatLng([latitude, longitude]); // Atualiza a posição do marcador
      },
      this.geolocationService.handleGeolocationError,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }
}
