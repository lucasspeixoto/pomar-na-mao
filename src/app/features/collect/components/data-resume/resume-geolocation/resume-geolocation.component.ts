import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';

@Component({
  selector: 'app-resume-geolocation',
  imports: [],
  template: `
    <div
      class="card mb-0 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(132,204,22,0.35)]">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4 text-md md:text-xl">GPS</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-sm md:text-lg">
            Coordenadas
            <span class="hidden sm:inline-block">
              @if (isCoordinatesAvailable()) {
                <i class="pi pi-check ml-1" style="color: green"></i>
              } @else {
                <i class="pi pi-times ml-1" style="color: red"></i>
              }
            </span>
          </div>
        </div>
        <div
          class="size-[1.5rem] sm:size-[2.5rem] flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border">
          <i class="pi pi-map-marker text-orange-500 !text-md md:!text-lg"></i>
        </div>
      </div>
      @if (isPermissionGranted()) {
        <span class="text-green-400 text-sm md:text-md font-medium">Ativa</span>
      } @else {
        <span class="text-red-400 text-sm md:text-md font-medium">Desativada</span>
      }
    </div>
  `,
  styles: [
    `
      .card {
        padding: 0.8rem 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeGeolocationComponent implements OnInit {
  public geolocationService = inject(GeolocationService);

  public isCoordinatesAvailable = this.geolocationService.isCoordinatesAvailable;

  public isPermissionGranted = this.geolocationService.isPermissionGranted;

  public ngOnInit(): void {
    this.geolocationService.getLocaltionPermission();
    this.geolocationService.getLocaltionCoordinate();
  }
}
