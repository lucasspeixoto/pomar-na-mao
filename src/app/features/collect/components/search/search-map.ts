import {
  ChangeDetectionStrategy,
  Component,
  inject,
  AfterViewInit,
  OnInit,
  effect,
  OnDestroy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type * as Leaflet from 'leaflet';

import { SearchFiltersStore } from '@collectS/search-filters-store';
import { PlantPositionDetect } from '@sharedS/plant-position-detect';
import { FormsModule } from '@angular/forms';
import { sortCoordinatesClockwise } from '@sharedU/sort-coordinates';
import { CollectApi } from '@collectS/collect-api';
import { FarmRegionApi } from '@collectS/farm-region-api';
import { GeolocationNavigator } from '@collectS/geolocation-navigator';
import { LoadingStore } from '@sharedS/loading-store';
import { maxAcceptableAccuracy } from '@sharedU/geolocation-math';
import { SearchMapActions } from './search-map-actions';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-search-map',
  imports: [ButtonModule, ToggleSwitchModule, FormsModule, SearchMapActions],
  template: `
    @let collects = collectService.numberOfFilteredCollects();

    <app-search-map-actions
      [isAutoDetectionModeOn]="isAutoDetectionModeOn()"
      [isCollectDataEmpty]="collects === 0 ? true : false"
      (detectNearestCollect)="detectNearestCollect($event)"
      (changeAutoDetectionMode)="onChangeAutoDetectionMode()"
      (plotRegionPolygon)="plotRegionPolygon()" />

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

      .card {
        padding: 1rem;

        @media (max-width: 768px) {
          padding: 8px;
        }
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

  public isAutoDetectionModeOn = signal(false);

  public userMarker!: Leaflet.Marker;

  public clickedPointMarker!: Leaflet.Marker;

  public map2!: Leaflet.Map;

  public polygonLayer!: Leaflet.Polygon | null;

  public plottedPoints: Leaflet.CircleMarker[] = [];

  public nearestPoint!: Leaflet.CircleMarker | null;

  public intervalId: NodeJS.Timeout | null = null;

  public intervalOn = false;

  public isMapElementAvailable = false;

  public accuracy = signal<number | null>(null);

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
        const [latitude, longitude, accuracy] =
          this.geolocationNavigator.getUserLatitudeAndLongitude(position);

        const coordinates = { latitude, longitude, accuracy };

        this.geolocationNavigator.coordinates.set(coordinates);
        this.geolocationNavigator.coordinatesTimestamp.set(position.timestamp);
        this.accuracy.set(accuracy);

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

        this.accuracy.set(accuracy);

        const coordinates = { latitude, longitude, accuracy };

        this.userMarker?.setLatLng([latitude, longitude]);

        this.geolocationNavigator.coordinates.set(coordinates);
        this.geolocationNavigator.coordinatesTimestamp.set(position.timestamp);

        if (this.isAutoDetectionModeOn()) {
          this.detectNearestCollect(false);
        }
      },
      error => {
        this.geolocationNavigator.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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

          marker.bindPopup(`Ponto: ${item.description}`).openPopup();
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

  public onChangeAutoDetectionMode(): void {
    this.isAutoDetectionModeOn.update(current => !current);

    if (this.isAutoDetectionModeOn()) {
      this.detectNearestCollect(false);
    } else {
      this.removeNearestPoint();
      this.plantPositionDetect.setDetectedColledtId(null);
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
      .bindPopup(`Ponto: ${nearestCollect?.description}`)
      .openPopup();

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
