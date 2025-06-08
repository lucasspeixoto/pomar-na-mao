import {
  ChangeDetectionStrategy,
  Component,
  inject,
  AfterViewInit,
  OnInit,
  effect,
  model,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import type * as Leaflet from 'leaflet';

import { SearchFiltersStore } from '@collectS/search-filters-store';
import { PlantPositionDetect } from '@sharedS/plant-position-detect';
import { FormsModule } from '@angular/forms';
import { sortCoordinatesClockwise } from '@sharedU/sort-coordinates';
import { CollectApi } from '@collectS/collect-api';
import { FarmRegionApi } from '@collectS/farm-region-api';
import { GeolocationNavigator, type Coordinate } from '@collectS/geolocation-navigator';
import { LoadingStore } from '@sharedS/loading-store';
import {
  averagePosition,
  bufferSize,
  getDistance,
  maxAcceptableAccuracy,
  threshold,
  type Point,
} from '@sharedU/geolocation-math';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-search-map',
  imports: [ButtonModule, ToggleSwitchModule, FormsModule],
  template: `
    @let collects = collectService.numberOfFilteredCollects();

    <div class="mb-4 flex flex-wrap w-full items-center justify-center md:justify-between gap-4">
      <span
        class="hidden md:block font-bold self-start md:text-xl dark:text-slate-300 text-slate-800"
        >Exibição de coletas</span
      >

      <div class="flex items-center justify-between gap-1 mt-1">
        <label for="autoDetectionID">Auto Detectar</label>
        <p-toggleswitch
          (onChange)="onChangeAutoDetectionMode($event)"
          inputId="autoDetectionID"
          [(ngModel)]="isAutoDetectionModeOn" />
      </div>
      <div class="flex flex-wrap items-center justify-center md:justify-end gap-2">
        <p-button
          icon="pi pi-wifi"
          [disabled]="collects === 0"
          severity="warn"
          label="Detectar"
          (click)="detectNearestCollect(true)" />
        <p-button
          [icon]="this.polygonLayer ? 'pi pi-eye' : 'pi pi-eye-slash'"
          [disabled]="!collectSearchFiltersStore.selectedRegion()"
          severity="info"
          label="Região"
          (click)="plotRegionPolygon()" />
        <p-button
          icon="pi pi-map-marker"
          severity="help"
          label="Posicionar"
          (click)="reloadPage()" />
      </div>
    </div>

    <div id="map2"></div>
  `,
  styles: [
    `
      #map2 {
        height: 300px;
        width: 100%;
        border-radius: 10px;
        z-index: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchMap implements OnInit, AfterViewInit, OnDestroy {
  public geolocationNavigator = inject(GeolocationNavigator);

  public collectService = inject(CollectApi);

  public collectSearchFiltersStore = inject(SearchFiltersStore);

  public farmRegionApi = inject(FarmRegionApi);

  public plantPositionDetect = inject(PlantPositionDetect);

  public loadingStore = inject(LoadingStore);

  public filteredCollectData = this.collectService.filteredCollectData;

  public isAutoDetectionModeOn = model(false);

  public userMarker!: Leaflet.Marker;

  public clickedPointMarker!: Leaflet.Marker;

  public map2!: Leaflet.Map;

  public polygonLayer!: Leaflet.Polygon | null;

  public plottedPoints: Leaflet.CircleMarker[] = [];

  public nearestPoint!: Leaflet.CircleMarker | null;

  public intervalId: NodeJS.Timeout | null = null;

  public intervalOn = false;

  public isMapElementAvailable = false;

  public lastPosition: Coordinate | null = null;

  public positionBuffer: Coordinate[] = [];

  constructor() {
    effect(() => {
      if (this.collectService.filteredCollectData().length === 0) {
        this.removeMapPlots();
      } else {
        if (this.isMapElementAvailable) this.plotCollectedPoints();
      }
    });
  }

  public ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.geolocationNavigator.getLocaltionPermission();
  }

  public ngAfterViewInit(): void {
    this.map2 = L.map('map2');

    this.isMapElementAvailable = true;

    if (!navigator.geolocation) {
      console.warn('Localização indisponível neste dispositivo!');
      this.geolocationNavigator.showUnavailableGeolocation();
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const [latitude, longitude] =
          this.geolocationNavigator.getUserLatitudeAndLongitude(position);

        this.map2.setView([latitude, longitude], 16);

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 30,
        }).addTo(this.map2);

        setTimeout(() => this.map2.invalidateSize(), 500);
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

        const currentPos = { latitude, longitude, accuracy };

        const point1: Point = {
          latitude: this.lastPosition!.latitude,
          longitude: this.lastPosition!.longitude,
        };

        const point2: Point = {
          latitude: currentPos.latitude,
          longitude: currentPos.longitude,
        };

        // Ignore small jumps
        if (this.lastPosition) {
          const distance = getDistance(point1, point2);

          if (distance < threshold) {
            return;
          }
        }

        this.lastPosition = currentPos;

        // Add to buffer for smoothing
        this.positionBuffer.push(currentPos);

        if (this.positionBuffer.length > bufferSize) {
          this.positionBuffer.shift();
        }

        const smoothedPosition = averagePosition(this.positionBuffer);

        this.userMarker?.setLatLng([smoothedPosition.latitude, smoothedPosition.longitude]);

        this.geolocationNavigator.coordinates.set(smoothedPosition);
        this.geolocationNavigator.coordinatesTimestamp.set(position.timestamp);

        if (this.isAutoDetectionModeOn()) {
          this.detectNearestCollect(false);
        }
      },
      error => {
        this.geolocationNavigator.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );

    if (this.isMapElementAvailable) this.plotCollectedPoints();
  }

  public plotRegionPolygon(): void {
    if (this.polygonLayer) {
      this.polygonLayer.remove();
      this.polygonLayer = null;
      return;
    }

    const selectedRegion = this.collectSearchFiltersStore.selectedRegion();

    const polygonCoordinates = this.farmRegionApi
      .farmRegions()
      .filter(item => item.region === selectedRegion)
      .map(item => [item.latitude, item.longitude]) as [number, number][];

    const closedPoligon = [...sortCoordinatesClockwise(polygonCoordinates)];

    if (this.map2) {
      this.polygonLayer = L.polygon(closedPoligon, {
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.5,
      })
        .addTo(this.map2)
        .bringToBack();

      this.map2.fitBounds(this.polygonLayer.getBounds());
    }
  }

  public removePolygon(): void {
    if (this.polygonLayer) {
      this.polygonLayer.remove();
      this.polygonLayer = null;
    }
  }

  public plotCollectedPoints(): void {
    this.removePlottedPoints();

    this.collectService.filteredCollectData()?.forEach(item => {
      const marker = L.circleMarker([item.latitude, item.longitude], {
        radius: 4,
        color: 'green',
        fillColor: 'green',
        fillOpacity: 1,
      })
        .addTo(this.map2)
        .on('click', (e: L.LeafletMouseEvent) => {
          const clickedLat = e.latlng.lat;
          const clickedLng = e.latlng.lng;
          console.log(`Lat: ${clickedLat}, Lng: ${clickedLng}`);

          marker.bindPopup(`#${item.id.split('-')[0]}`).openPopup();
        });

      this.plottedPoints.push(marker);
    });
  }

  public removePlottedPoints(): void {
    this.plottedPoints.forEach(marker => {
      marker.remove();
    });

    this.plottedPoints = [];
  }

  public onChangeAutoDetectionMode(event: ToggleSwitchChangeEvent): void {
    if (event.checked) {
      this.detectNearestCollect(false);
    }
  }

  public detectNearestCollect(showMessage: boolean): void {
    if (this.nearestPoint) {
      this.nearestPoint.remove();
      this.nearestPoint = null;
    }

    const nearestCollect = this.plantPositionDetect.detectNearestCollect(showMessage);

    this.nearestPoint = L.circleMarker([nearestCollect!.latitude, nearestCollect!.longitude], {
      radius: 6,
      color: '#a31a1f',
      fillColor: '#a31a1f',
      fillOpacity: 1,
    })
      .addTo(this.map2)
      .bindPopup(`Coleta próxima: #${nearestCollect?.id.split('-')[0]}`);

    this.plantPositionDetect.setDetectedColledtId(nearestCollect!.id);

    this.bringNearestPointToFront(nearestCollect!.id);
  }

  public removeNearestPoint(): void {
    if (this.nearestPoint) {
      this.nearestPoint.remove();
      this.nearestPoint = null;
    }
  }

  public bringNearestPointToFront(id: string): void {
    const index = this.filteredCollectData().findIndex(collect => collect.id === id);
    if (index > -1) {
      const [item] = this.filteredCollectData().splice(index, 1);
      this.filteredCollectData().unshift(item);
    }
  }

  public reloadPage(): void {
    window.location.reload();
  }

  public removeMapPlots(): void {
    this.removePlottedPoints();
    this.removePolygon();
    this.removeNearestPoint();
  }

  public ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
