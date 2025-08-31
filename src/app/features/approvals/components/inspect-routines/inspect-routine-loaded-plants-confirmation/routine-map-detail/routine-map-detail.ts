import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import type * as Leaflet from 'leaflet';
import { InspectRoutinePlantsStore } from '../../../../services/inspect-routine/inspect-routine-plants-store';
import { InspectRoutineStore } from '../../../../services/inspect-routine/inspect-routine-store';
import { PlantsStore } from '../../../../services/plants/plants-store';
import { GeolocationNavigator, type Coordinate } from '@sharedS/geolocation-navigator';
import { GEOLOCATION_INFO_TEXT } from '@sharedCs/texts';
import { FarmRegionApi } from '@sharedS/farm-region-api';
import { sortCoordinatesClockwise } from '@sharedU/sort-coordinates';

declare let L: typeof Leaflet;

@Component({
  selector: 'app-routine-map-detail',
  templateUrl: './routine-map-detail.html',
  imports: [],
  styles: [
    `
      #map {
        height: 180px;

        width: 100%;
        border-radius: 10px;
        z-index: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineMapDetailComponent {
  public inspectRoutinePlantsStore = inject(InspectRoutinePlantsStore);

  public inspectRoutineStore = inject(InspectRoutineStore);

  public plantsStore = inject(PlantsStore);

  public selectedInspectRoutine = this.inspectRoutineStore.selectedInspectRoutine;

  public selectedPlant = this.plantsStore.selectedPlant;

  public geolocationNavigator = inject(GeolocationNavigator);

  public farmRegionApi = inject(FarmRegionApi);

  public plantMarker!: Leaflet.CircleMarker;

  public map!: Leaflet.Map;

  public polygonLayer!: Leaflet.Polygon | null;

  public geolocationTextInfo = GEOLOCATION_INFO_TEXT;

  public isMapElementAvailable = false;

  public lastPosition: Coordinate | null = null;

  public positionBuffer: Coordinate[] = [];

  constructor() {
    /* Escutar o carregamento de plantas da rotina e buscar a primeira da lista
     * para iniciar a exibição
     */
    effect(() => {
      const currentInspectRoutinePlants = this.inspectRoutinePlantsStore.inspectRoutinePlants();

      if (currentInspectRoutinePlants.length > 0) {
        this.startMapBuild();
      }
    });
  }

  public startMapBuild(): void {
    if (!navigator.geolocation) {
      console.warn('Localização indisponível neste dispositivo!');
      this.geolocationNavigator.showUnavailableGeolocation();
    }

    const latitude = this.selectedPlant()?.latitude!;

    const longitude = this.selectedPlant()?.longitude!;

    if (!this.map) {
      this.map = L.map('map');

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 30,
      }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();
        this.plotRegionPolygon();
      }, 500);
    } else {
      this.plantMarker?.remove();

      this.map.setView([latitude, longitude], 18);

      this.plantMarker = L.circleMarker([latitude, longitude], {
        radius: 4,
        color: 'green',
        fillColor: 'green',
        fillOpacity: 1,
      }).addTo(this.map);
    }
  }

  public plotRegionPolygon(): void {
    if (this.polygonLayer) {
      this.polygonLayer.remove();
      this.polygonLayer = null;
      return;
    }

    const selectedRegion = this.selectedInspectRoutine()?.region;

    const polygonCoordinates = this.farmRegionApi
      .farmRegions()
      .filter(item => item.region === selectedRegion)
      .map(item => [item.latitude, item.longitude]) as [number, number][];

    const closedPoligon = [...sortCoordinatesClockwise(polygonCoordinates)];

    if (this.map) {
      this.polygonLayer = L.polygon(closedPoligon, {
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.5,
      })
        .addTo(this.map)
        .bringToBack();

      this.map.fitBounds(this.polygonLayer.getBounds());
    }
  }
}
