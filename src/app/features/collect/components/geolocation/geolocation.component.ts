import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

import type * as Leaflet from 'leaflet';
import { GEOLOCATION_INFO_TEXT } from '@collectCs/texts';
import { GeolocationService } from '@collectS/geolocation/geolocation.service';
import { EpochToTimePipe } from '@sharedPp/epoch-to-time/epoch-to-time.pipe';

declare let L: typeof Leaflet;

const PRIMENG = [CardModule, MessageModule, ButtonModule];

const PIPES = [EpochToTimePipe];

@Component({
  selector: 'app-geolocation',
  imports: [...PRIMENG, ...PIPES],
  templateUrl: './geolocation.component.html',
  styleUrl: './geolocation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeolocationComponent implements OnInit, AfterViewInit {
  public currentDate = new Date();

  public geolocationService = inject(GeolocationService);

  public cd = inject(ChangeDetectorRef);

  public userMarker!: Leaflet.Marker;

  public map!: Leaflet.Map;

  public geolocationTextInfo = GEOLOCATION_INFO_TEXT;

  public isMapElementAvailable = false;

  public ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.loadGeolocationData();
  }

  public ngAfterViewInit(): void {
    this.startMapRender();
  }

  public loadGeolocationData(): void {
    this.geolocationService.getLocaltionPermission();
    this.geolocationService.getLocaltionCoordinate();
  }

  public startMapRender(): void {
    this.map = L.map('map');

    this.isMapElementAvailable = true;

    if (!navigator.geolocation) {
      console.warn('Localização indisponível neste dispositivo!');
      this.geolocationService.showUnavailableGeolocation();
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.map.setView([latitude, longitude], 19);

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 30,
        }).addTo(this.map);
      },
      error => {
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );

    navigator.geolocation.watchPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.userMarker?.setLatLng([latitude, longitude]);
      },
      error => {
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
