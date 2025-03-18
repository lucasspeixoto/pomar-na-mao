import { ConnectivityService } from './../../../../shared/services/connectivity/connectivity.service';
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, AfterViewInit, signal, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import type * as Leaflet from 'leaflet';
import { IndexDbCollectService } from '../../services/index-db-collect.service';
import type { PlantData } from '../../../collect/models/collect.model';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Router } from '@angular/router';

declare let L: typeof Leaflet;

const ZORRO = [NzGridModule, NzButtonModule, NzCardModule, NzIconModule, NzToolTipModule];

const COMMON = [DatePipe, NgClass];

@Component({
  selector: 'app-offline-collect-statistics',
  imports: [...ZORRO, ...COMMON],
  templateUrl: './offline-collect-statistics.component.html',
  styleUrls: ['./offline-collect-statistics.component.scss'],
})
export class OfflineCollectStatisticsComponent implements OnInit, AfterViewInit {
  public currentDate = new Date();

  public geolocationService = inject(GeolocationService);

  public connectivityService = inject(ConnectivityService);

  public indexDbCollectService = inject(IndexDbCollectService);

  public router = inject(Router);

  public userMarker!: Leaflet.Marker;

  public map!: Leaflet.Map;

  public isLocationAvailable = signal(false);

  public collectedData = signal<PlantData[]>([]);

  public totalCollectedData = this.indexDbCollectService.totalCollectedData;

  public ngOnInit(): void {
    this.loadGeolocationData();

    this.indexDbCollectService.listAllCollects().subscribe(data => {
      this.collectedData.set(data);
    });
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
