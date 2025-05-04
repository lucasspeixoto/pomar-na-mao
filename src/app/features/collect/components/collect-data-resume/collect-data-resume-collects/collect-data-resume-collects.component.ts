import { Component, inject, OnInit } from '@angular/core';
import { FarmRegionService } from '../../../services/farm-region/farm-region.service';
import { CollectService } from '../../../services/collect/collect.service';

@Component({
  selector: 'app-collect-data-resume-collects',
  imports: [],
  template: `
    <div
      class="card mb-0 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(132,204,22,0.35)]">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4 text-md md:text-xl">Coletas</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-sm md:text-lg">
            {{ collectService.numberOfCollectedData() }}
          </div>
        </div>
        <div
          class="size-[1.5rem] sm:size-[2.5rem] flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border">
          <i class="pi pi-database text-purple-500 !text-md md:!text-lg"></i>
        </div>
      </div>
      <div class="flex gap-1 w-full">
        <span class="text-cyan-500 font-semibold text-sm md:text-md"
          >{{ farmRegionService.numberOfRegions() }} regiões
        </span>
        <span class="text-pink-500 font-semibold text-sm md:text-md"
          >{{ farmRegionService.numberOfFarmRegionPoints() }} pontos
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        padding: 2rem 0.8rem;

        @media (max-width: 400px) {
          padding: 0.8rem;
        }
      }
    `,
  ],
})
export class CollectDataResumeCollectsComponent implements OnInit {
  public farmRegionService = inject(FarmRegionService);

  public collectService = inject(CollectService);

  public ngOnInit(): void {
    this.farmRegionService.getAllFarmRegionsHandler();
  }
}
