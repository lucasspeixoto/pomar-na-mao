import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

import type * as Leaflet from 'leaflet';
import { GEOLOCATION_INFO_TEXT } from '@collectCs/texts';
import { GeolocationNavigator, type Coordinate } from '@collectS/geolocation-navigator';
import { maxAcceptableAccuracy } from '@sharedU/geolocation-math';
import { DeviceGeolocationWebInfos } from './device-geolocation-web-infos';
import { DeviceGeolocationMobileInfos } from './device-geolocation-mobile-infos';
import { GeolocationFormInfo } from './geolocation-form-info';

declare let L: typeof Leaflet;

const PRIMENG = [ButtonModule];

const COMPONENTS = [DeviceGeolocationWebInfos, DeviceGeolocationMobileInfos, GeolocationFormInfo];

@Component({
  selector: 'app-device-geolocation',
  imports: [...PRIMENG, ...COMPONENTS],
  template: `
    <div class="overflow-hidden flex flex-col min-h-[450px]">
      <div class="self-end inline-block md:hidden my-2">
        <p-button
          (click)="reloadPage()"
          class="mt-4 self-end flex items-center justify-center opacity-80 hover:opacicy-100">
          <span>Reposicionar</span>
          <img width="20px" height="20px" alt="Mapa" src="assets/images/map.png" />
        </p-button>
      </div>

      <app-device-geolocation-mobile-infos />

      <div class="w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-4">
        <div class="hidden md:inline-block w-full md:w-1/3">
          <div class="w-full flex flex-col justify-between h-full">
            <app-geolocation-form-info />

            <app-device-geolocation-web-infos />
          </div>
        </div>

        <div class="w-full md:2/3">
          <div id="map"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #map {
        height: 480px;
        width: 100%;
        border-radius: 10px;
        z-index: 0;
      }

      @media (max-width: 768px) {
        #map {
          height: calc(100vh - 270px);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DeviceGeolocation implements OnInit, AfterViewInit {
  public currentDate = new Date();

  public geolocationNavigator = inject(GeolocationNavigator);

  public userMarker!: Leaflet.Marker;

  public map!: Leaflet.Map;

  public geolocationTextInfo = GEOLOCATION_INFO_TEXT;

  public isMapElementAvailable = false;

  public lastPosition: Coordinate | null = null;

  public positionBuffer: Coordinate[] = [];

  public accuracy = signal<number | null>(null);

  public ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.geolocationNavigator.getLocaltionPermission();
  }

  public ngAfterViewInit(): void {
    this.map = L.map('map');

    this.isMapElementAvailable = true;

    if (!navigator.geolocation) {
      console.warn('Localização indisponível neste dispositivo!');
      this.geolocationNavigator.showUnavailableGeolocation();
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const [latitude, longitude, accuracy] =
          this.geolocationNavigator.getUserLatitudeAndLongitude(position);

        const coordinates = { latitude, longitude, accuracy };

        this.geolocationNavigator.coordinates.set(coordinates);
        this.geolocationNavigator.coordinatesTimestamp.set(position.timestamp);
        this.accuracy.set(accuracy);

        this.map.setView([latitude, longitude], 16);

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 30,
        }).addTo(this.map);

        setTimeout(() => this.map.invalidateSize(), 500);
      },
      error => {
        this.geolocationNavigator.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );

    navigator.geolocation.watchPosition(
      position => {
        const [latitude, longitude, accuracy] =
          this.geolocationNavigator.getUserLatitudeAndLongitude(position);

        // Ignore poor accuracy
        if (accuracy > maxAcceptableAccuracy) {
          return;
        }

        this.accuracy.set(accuracy);

        const coordinates = { latitude, longitude, accuracy };

        this.userMarker?.setLatLng([latitude, longitude]);

        this.geolocationNavigator.coordinates.set(coordinates);
        this.geolocationNavigator.coordinatesTimestamp.set(position.timestamp);
      },
      error => {
        this.geolocationNavigator.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
