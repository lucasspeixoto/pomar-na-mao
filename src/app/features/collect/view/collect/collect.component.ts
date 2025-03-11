/* eslint-disable prefer-const */
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { PlantUploadComponent } from '../../components/plant-upload/plant-upload.component';
import { GeolocationComponent } from '../../components/geolocation/geolocation.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ComplementDataComponent } from '../../components/complement-data/complement-data.component';

import type * as Leaflet from 'leaflet';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
export class CollectComponent implements OnInit {
  private notificationService = inject(NzNotificationService);

  public ngOnInit(): void {
    if (!navigator.geolocation) {
      console.warn('location is not supported!');
      this.notificationService.warning('GPS', 'Localização indisponível neste dispositivo!');
    }

    let map = L.map('map');

    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;

      const { latitude, longitude } = coords;

      map.setView([latitude, longitude], 13);

      let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> ',
        maxZoom: 19,
      });

      osm.addTo(map);

      L.marker([latitude, longitude]).addTo(map);
    });

    let desLat = 0;

    let id = navigator.geolocation.watchPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        if (latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }

        L.marker([latitude, longitude]);

        map.flyTo([latitude, longitude]);
      },
      error => {
        if (error.code === 1) {
          this.notificationService.warning('GPS', 'Por favor ative o GPS do dispositivo!');
        } else {
          this.notificationService.error('Erro', 'Não foi posível obter a localização!');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
