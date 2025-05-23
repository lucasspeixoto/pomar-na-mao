import {
  ChangeDetectionStrategy,
  Component,
  inject,
  AfterViewInit,
  OnInit,
  effect,
  model,
  OnDestroy,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule, type ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import type * as Leaflet from 'leaflet';
import { CollectService } from '@collectS/collect/collect.service';
import { FarmRegionService } from '@collectS/farm-region/farm-region.service';
import { GeolocationService } from '@collectS/geolocation/geolocation.service';
import { SearchFiltersService } from '@collectS/search-filters/search-filters.service';
import { DetectionService } from '@sharedS/detection/detection.service';
import { FormsModule } from '@angular/forms';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-search-map',
  imports: [ButtonModule, ToggleSwitchModule, FormsModule],
  templateUrl: './search-map.component.html',
  styleUrl: './search-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMapComponent implements OnInit, AfterViewInit, OnDestroy {
  public geolocationService = inject(GeolocationService);

  public collectService = inject(CollectService);

  public collectSearchFiltersService = inject(SearchFiltersService);

  public farmRegionService = inject(FarmRegionService);

  public detectionService = inject(DetectionService);

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

  constructor() {
    effect(() => {
      if (this.collectService.filteredCollectData().length === 0) {
        this.removePlottedPoints();
        this.removePolygon();
        this.removeNearestPoint();
      } else {
        this.plotCollectedPoints();
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadGeolocationData();
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

        if (this.isAutoDetectionModeOn()) {
          this.detectNearestCollect(false);
        }
      },
      error => {
        this.geolocationService.handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }

  public plotRegionPolygon(): void {
    if (this.polygonLayer) {
      this.polygonLayer.remove();
      this.polygonLayer = null;
      return;
    }

    const selectedRegion = this.collectSearchFiltersService.selectedRegion();

    const polygonCoordinates = this.farmRegionService
      .farmRegions()
      .filter(item => item.region === selectedRegion)
      .map(item => [item.latitude, item.longitude]) as [number, number][];

    if (this.map2) {
      this.polygonLayer = L.polygon(polygonCoordinates, {
        color: '#3f4046',
        fillColor: '#3f4046',
        fillOpacity: 0.4,
      })
        .addTo(this.map2)
        .bringToBack();
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

    this.collectService.filteredCollectData().forEach(item => {
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
    /* if (event.checked) {
      if (this.intervalOn) {
        clearInterval(this.intervalId!);
        this.intervalId = null;
        this.intervalOn = false;
      } else {
        this.intervalId = setInterval(() => {
          console.warn('Modo de detecção automática ativado');
          this.detectNearestCollect(false);
        }, 5000);
        this.intervalOn = true;
      }
    } else {
      clearInterval(this.intervalId!);
      this.intervalId = null;
      this.intervalOn = false;
    } */
  }

  public detectNearestCollect(showMessage: boolean): void {
    if (this.nearestPoint) {
      this.nearestPoint.remove();
      this.nearestPoint = null;
    }

    const nearestCollect = this.detectionService.detectNearestCollect(showMessage);

    this.nearestPoint = L.circleMarker([nearestCollect!.latitude, nearestCollect!.longitude], {
      radius: 6,
      color: '#a31a1f',
      fillColor: '#a31a1f',
      fillOpacity: 1,
    })
      .addTo(this.map2)
      .bindPopup(`Coleta próxima: #${nearestCollect?.id.split('-')[0]}`);

    this.detectionService.setDetectedColledtId(nearestCollect!.id);

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

  public ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
