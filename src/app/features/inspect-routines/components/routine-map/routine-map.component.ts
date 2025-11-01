import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  AfterViewInit,
  effect,
} from '@angular/core';

import { RoutineMainInfo } from '../../models/routine-main-info';
import { FarmRegionService } from '../../../../shared/services/farm-region.service';
import { sortCoordinatesClockwise } from '../../../../utils/sort-coordinates';
import { GeolocationNavigatorService } from '../../../../shared/services/geolocation-navigator.service';
import type * as Leaflet from 'leaflet';
import { PlantsService } from '../../../plants/services/plants.service';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-routine-map',
  templateUrl: './routine-map.component.html',
  styles: [
    `
      #map {
        height: 300px;
        width: 100%;
        border-radius: 16px;
      }

      @media (min-width: 640px) {
        #map {
          height: 350px; /* sm */
        }
      }
      @media (min-width: 768px) {
        #map {
          height: 400px; /* md */
        }
      }
      @media (min-width: 1024px) {
        #map {
          height: 500px; /* lg */
        }
      }
      @media (min-width: 1280px) {
        #map {
          height: 600px; /* xl */
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineMapComponent implements AfterViewInit, OnDestroy {
  @Input() public routineDetail!: RoutineMainInfo;

  public farmRegionApi = inject(FarmRegionService);

  public geolocationNavigator = inject(GeolocationNavigatorService);

  public plantsService = inject(PlantsService);

  public map!: Leaflet.Map;

  public polygonLayer!: Leaflet.Polygon | null;

  public plantMarker!: Leaflet.CircleMarker;

  constructor() {
    effect(() => {
      if (this.plantMarker) this.plantMarker?.remove();

      const currentSelectedPlantInComparison = this.plantsService.selectedPlantInComparison();

      if (currentSelectedPlantInComparison) {
        const { latitude, longitude } = currentSelectedPlantInComparison;

        this.plantMarker = L.circleMarker([latitude!, longitude!], {
          radius: 4,
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 1,
        }).addTo(this.map);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.initMap();
    this.plotRegionPolygon();
  }

  private initMap(): void {
    if (!this.map) {
      this.map = L.map('map', { zoom: 13 });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
    }
  }

  public async plotRegionPolygon(): Promise<void> {
    if (this.polygonLayer) {
      this.polygonLayer.remove();
      this.polygonLayer = null;
      return;
    }

    const selectedRegion = this.routineDetail.region;

    const farmRegions = this.farmRegionApi.farmRegions();

    if (farmRegions.length === 0) {
      await this.farmRegionApi.getAllFarmRegionsHandler();
    }

    const polygonCoordinates = this.farmRegionApi
      .farmRegions()
      .filter(item => item.region === selectedRegion)
      .map(item => [item.latitude, item.longitude]) as [number, number][];

    const closedPoligon = [...sortCoordinatesClockwise(polygonCoordinates)];

    if (this.map && polygonCoordinates.length > 0) {
      const [latitude, longitude] = polygonCoordinates[0];
      this.map.setView([latitude, longitude], 13);

      this.polygonLayer = L.polygon(closedPoligon, {
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.5,
      })
        .addTo(this.map)
        .bringToBack()
        .bindPopup(`<b>Região ${selectedRegion}</b>`)
        .openPopup();

      this.map.fitBounds(this.polygonLayer.getBounds());
    }
  }

  public removeMap(): void {
    if (this.map) {
      if (this.plantMarker) this.plantMarker?.remove();

      if (this.polygonLayer) {
        this.polygonLayer.remove();
        this.polygonLayer = null;
      }

      this.map.remove();
      this.map = null!;
    }
  }

  public ngOnDestroy(): void {
    this.removeMap();
  }
}
