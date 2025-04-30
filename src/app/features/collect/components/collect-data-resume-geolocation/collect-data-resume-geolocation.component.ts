import { Component, inject, type OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

@Component({
  selector: 'app-collect-data-resume-geolocation',
  imports: [],
  template: `
    <div class="card mb-0">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">GPS</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            Coordenadas
            @if (isCoordinatesAvailable()) {
              <i class="pi pi-check ml-1" style="color: green"></i>
            } @else {
              <i class="pi pi-times ml-1" style="color: red"></i>
            }
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem">
          <i class="pi pi-map-marker text-orange-500 !text-xl"></i>
        </div>
      </div>
      @if (isPermissionGranted()) {
        <span class="text-green-400 font-medium">Ativa</span>
      } @else {
        <span class="text-red-400 font-medium">Desativada</span>
      }
    </div>
  `,
})
export class CollectDataResumeGeolocationComponent implements OnInit {
  public geolocationService = inject(GeolocationService);

  public isCoordinatesAvailable = this.geolocationService.isCoordinatesAvailable;

  public isPermissionGranted = this.geolocationService.isPermissionGranted;

  public ngOnInit(): void {
    this.geolocationService.getLocaltionPermission();
    this.geolocationService.getLocaltionCoordinate();
  }
}
