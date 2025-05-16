import { ChangeDetectionStrategy, Component, inject, AfterViewInit, OnInit } from '@angular/core';

import type * as Leaflet from 'leaflet';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { ButtonModule } from 'primeng/button';
import { CollectSearchFiltersService } from '../../../services/collect-search/collect-search-filters.service';
import { FarmRegionService } from '../../../services/farm-region/farm-region.service';
import { CollectService } from '../../../services/collect/collect.service';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-collect-search-map',
  imports: [ButtonModule],
  templateUrl: './collect-search-map.component.html',
  styleUrl: './collect-search-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectSearchMapComponent implements OnInit, AfterViewInit {
  public geolocationService = inject(GeolocationService);

  public collectService = inject(CollectService);

  public collectSearchFiltersService = inject(CollectSearchFiltersService);

  public farmRegionService = inject(FarmRegionService);

  public userMarker!: Leaflet.Marker;

  public map2!: Leaflet.Map;

  private polygonLayer!: Leaflet.Polygon | null;

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

    this.map2 = L.map('map2');

    navigator.geolocation.getCurrentPosition(
      position => {
        const [latitude, longitude] = this.geolocationService.getUserLatitudeAndLongitude(position);

        this.map2.setView([latitude, longitude], 17); // Move o mapa para a nova posição

        this.userMarker = L.marker([latitude, longitude]).addTo(this.map2); // Cria um marcador para o usuário

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
    const latLongItems = this.collectService
      .filteredCollectData()
      .map(item => [item.latitude, item.longitude]);

    // Iterate through the array and add markers for each point
    latLongItems.forEach(([latitude, longitude]) => {
      L.circleMarker([latitude, longitude], {
        radius: 4, // Size of the circle
        color: 'orange', // Border color
        fillColor: 'orange', // Fill color
        fillOpacity: 0.8, // Fill opacity
      })
        .addTo(this.map2)
        .bindPopup(`Latitude: ${latitude}, Longitude: ${longitude}`); // Optional popup
    });
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
