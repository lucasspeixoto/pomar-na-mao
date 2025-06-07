import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

import type * as Leaflet from 'leaflet';
import { GEOLOCATION_INFO_TEXT } from '@collectCs/texts';
import { EpochToTimePipe } from '@sharedPp/epoch-to-time-pipe';
import { GeolocationNavigator } from '@collectS/geolocation-navigator';

declare let L: typeof Leaflet;

const PRIMENG = [CardModule, MessageModule, ButtonModule];

const PIPES = [EpochToTimePipe];

@Component({
  selector: 'app-geolocation',
  imports: [...PRIMENG, ...PIPES],
  template: `
    <div class="overflow-hidden flex flex-col min-h-[450px]">
      @let coordinates = geolocationNavigator.coordinates();
      @let gpsTimestamp = geolocationNavigator.coordinatesTimestamp();

      <div class="inline-block md:hidden my-2">
        <p-button
          icon="pi pi-map-marker"
          severity="help"
          label="Posicionar"
          (click)="reloadPage()" />
      </div>

      <section class="inline-block md:hidden my-2">
        <div
          class="card z-50 bg-surface-50 rounded-xl shadow-lg p-4 flex justify-between items-center font-medium">
          <div class="text-md flex flex-col justify-center items-center gap-2">
            <span>Latitude</span>
            <span>{{ coordinates?.latitude }}</span>
          </div>
          <div class="text-md flex flex-col justify-center items-center gap-2">
            <span>Tempo</span>
            <span>{{ gpsTimestamp! | epochToTime }}</span>
          </div>
          <div class="text-md flex flex-col justify-center items-center gap-2">
            <span>Longitude</span>
            <span>{{ coordinates?.longitude }}</span>
          </div>
        </div>
      </section>

      <div class="w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-4">
        <div class="hidden md:inline-block w-full md:w-1/3">
          <div class="w-full flex flex-col justify-between h-full">
            <p-message severity="info">
              <div class="flex flex-col gap-1">
                <span class="text-md lg:text-lg text-justify font-semibold">{{
                  geolocationTextInfo
                }}</span>
                <p-button
                  severity="help"
                  class="self-end mt-1"
                  icon="pi pi-map-marker"
                  label="Posicionar"
                  (click)="reloadPage()" />
              </div>
            </p-message>

            <div>
              <p-card header="Coordenadas">
                <div class="mt-2 flex flex-col items-start gap-8">
                  <span class="font-semibold"
                    >Latitude:
                    <strong id="latitude" class="text-primary">{{ coordinates?.latitude }} </strong>
                  </span>

                  <span class="font-semibold"
                    >Longitude:
                    <strong id="longitude" class="text-primary"
                      >{{ coordinates?.longitude }}
                    </strong>
                  </span>

                  <span class="font-semibold"
                    >Tempo:
                    <strong id="timestamp" class="text-primary"
                      >{{ gpsTimestamp! | epochToTime }}
                    </strong>
                  </span>
                </div>
              </p-card>
            </div>
          </div>
        </div>

        <div class="w-full md:2/3">
          <div id="map" style="height: 480px;"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #map {
        width: 100%;
        border-radius: 10px;
        z-index: 0;
      }

      @media (max-width: 768px) {
        #map {
          height: calc(100vh - 200px);
        }
      }

      :host ::ng-deep .card {
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Geolocation implements OnInit, AfterViewInit {
  public currentDate = new Date();

  public geolocationNavigator = inject(GeolocationNavigator);

  public userMarker!: Leaflet.Marker;

  public map!: Leaflet.Map;

  public geolocationTextInfo = GEOLOCATION_INFO_TEXT;

  public isMapElementAvailable = false;

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
        const [latitude, longitude] =
          this.geolocationNavigator.getUserLatitudeAndLongitude(position);

        this.map.setView([latitude, longitude], 16);

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 30,
        }).addTo(this.map);

        setTimeout(() => {
          this.map.invalidateSize();
        }, 100);
      },
      error => {
        this.geolocationNavigator.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );

    navigator.geolocation.watchPosition(
      position => {
        const [latitude, longitude] =
          this.geolocationNavigator.getUserLatitudeAndLongitude(position);

        const coordinates = { latitude, longitude };

        this.userMarker?.setLatLng([latitude, longitude]);

        this.geolocationNavigator.coordinates.set(coordinates);
        this.geolocationNavigator.coordinatesTimestamp.set(position.timestamp);
      },
      error => {
        this.geolocationNavigator.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
