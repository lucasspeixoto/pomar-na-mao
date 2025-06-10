import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SearchFiltersStore } from '@collectS/search-filters-store';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search-map-actions',
  imports: [ButtonModule, ToggleSwitchModule, FormsModule, NgClass],
  template: `
    <!-- Mobile actions -->
    <div class="mb-4 w-full">
      <div
        class="card z-50 bg-surface-50 rounded-xl shadow-lg py-2 px-4 flex justify-between items-center font-medium">
        <div class="w-full flex flex-wrap items-start justify-between gap-2">
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm md:text-lg">Auto Detectar</span>
            <p-button
              [ngClass]="{
                'animate-ping': isAutoDetectionModeOn(),
                'animate-none': !isAutoDetectionModeOn(),
              }"
              icon="pi pi-wifi"
              [disabled]="isCollectDataEmpty()"
              [rounded]="true"
              [text]="true"
              severity="warn"
              (click)="onChangeAutoDetectionModeHandler()" />
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm md:text-lg">Detectar Próxima</span>
            <p-button
              icon="pi pi-wifi"
              [disabled]="isCollectDataEmpty()"
              [rounded]="true"
              [text]="true"
              severity="danger"
              (click)="detectNearestCollectHander()" />
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm md:text-lg">Região</span>
            <p-button
              icon="pi pi-map"
              [disabled]="!collectSearchFiltersStore.selectedRegion()"
              [rounded]="true"
              [text]="true"
              severity="info"
              (click)="plotRegionPolygonHandler()" />
          </div>

          <div class="flex flex-col items-center gap-1">
            <span class="text-sm md:text-lg">Atualizar Mapa</span>
            <p-button
              icon="pi pi-map-marker"
              [rounded]="true"
              [text]="true"
              severity="help"
              (click)="reloadPage()">
            </p-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        padding: 0.5rem 1rem;

        @media (max-width: 768px) {
          padding: 4px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchMapActions {
  public isAutoDetectionModeOn = input.required<boolean>();

  public isCollectDataEmpty = input.required<boolean>();

  public collectSearchFiltersStore = inject(SearchFiltersStore);

  public detectNearestCollect = output<boolean>();

  public changeAutoDetectionMode = output<void>();

  public plotRegionPolygon = output<void>();

  public detectNearestCollectHander(): void {
    this.detectNearestCollect.emit(true);
  }

  public onChangeAutoDetectionModeHandler(): void {
    this.changeAutoDetectionMode.emit();
  }

  public plotRegionPolygonHandler(): void {
    this.plotRegionPolygon.emit();
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
