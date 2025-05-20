import {
  ChangeDetectionStrategy,
  Component,
  inject,
  AfterViewInit,
  OnInit,
  effect,
} from '@angular/core';
import type * as Leaflet from 'leaflet';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { ButtonModule } from 'primeng/button';
import { FarmRegionService } from '../../../services/farm-region/farm-region.service';
import { CollectService } from '../../../services/collect/collect.service';
import { SearchFiltersService } from '../../../services/search-filters/search-filters.service';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-search-map',
  imports: [ButtonModule],
  templateUrl: './search-map.component.html',
  styleUrl: './search-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMapComponent implements OnInit, AfterViewInit {
  public geolocationService = inject(GeolocationService);

  public collectService = inject(CollectService);

  public collectSearchFiltersService = inject(SearchFiltersService);

  public farmRegionService = inject(FarmRegionService);

  public userMarker!: Leaflet.Marker;

  public map2!: Leaflet.Map;

  private polygonLayer!: Leaflet.Polygon | null;

  private plottedPoints: Leaflet.CircleMarker[] = [];

  constructor() {
    effect(() => {
      if (this.collectService.filteredCollectData().length === 0) {
        this.removePlottedPoints();
        this.removePolygon();
      } else {
        this.plotCollectedPoints();
      }
    });
  }

  public ngOnInit(): void {
    this.loadGeolocationData();
  }

  public ngAfterViewInit(): void {
    this.startMapRender();
  }

  public async loadGeolocationData(): Promise<void> {
    await this.geolocationService.getLocaltionPermission();
    this.geolocationService.getLocaltionCoordinate();
  }

  public startMapRender(): void {
    if (!navigator.geolocation) {
      console.warn('Localização indisponível neste dispositivo!');
      this.geolocationService.showUnavailableGeolocation();
    }

    this.map2 = L.map('map2');

    navigator.geolocation.getCurrentPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.map2.setView([latitude, longitude], 17);

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(this.map2);
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

  public plotRegionPolygon(): void {
    this.removePolygon();

    const selectedRegion = this.collectSearchFiltersService.selectedRegion();

    const polygonCoordinates = this.farmRegionService
      .farmRegions()
      .filter(item => item.region === selectedRegion)
      .map(item => [item.latitude, item.longitude]) as [number, number][];

    if (this.polygonLayer) {
      this.polygonLayer.remove();
    }

    if (this.map2) {
      this.polygonLayer = L.polygon(polygonCoordinates, {
        color: '#3f4046',
        fillColor: '#3f4046',
        fillOpacity: 0.4,
      }).addTo(this.map2);

      this.polygonLayer.bindPopup(`Região ${this.collectSearchFiltersService.selectedRegion()}`);
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

    const latLongItems = this.collectService
      .filteredCollectData()
      .map(item => [item.latitude, item.longitude]);

    latLongItems.forEach(([latitude, longitude]) => {
      const marker = L.circleMarker([latitude, longitude], {
        radius: 4,
        color: '#a3e635',
        fillColor: '#a3e635',
        fillOpacity: 0.8,
      })
        .addTo(this.map2)
        .bindPopup(`Latitude: ${latitude}, Longitude: ${longitude}`);

      this.plottedPoints.push(marker);
    });
  }

  public removePlottedPoints(): void {
    this.plottedPoints.forEach(marker => {
      marker.remove();
    });

    this.plottedPoints = [];
  }
}
