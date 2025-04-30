import { Component, inject, OnInit } from '@angular/core';
import { FarmRegionService } from '../../services/farm-region/farm-region.service';

@Component({
  selector: 'app-collect-data-resume-collects',
  imports: [],
  template: `
    <div class="card mb-0">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">Coletas</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">12311</div>
        </div>
        <div
          class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem">
          <i class="pi pi-database text-purple-500 !text-xl"></i>
        </div>
      </div>
      <div class="flex gap-1 w-full">
        <span class="text-cyan-500 font-semibold text-sm"
          >{{ farmRegionService.numberOfRegions() }} regiões
        </span>
        <span class="text-pink-500 font-semibold text-sm"
          >{{ farmRegionService.numberOfFarmRegionPoints() }} pontos
        </span>
      </div>
    </div>
  `,
})
export class CollectDataResumeCollectsComponent implements OnInit {
  public farmRegionService = inject(FarmRegionService);

  public ngOnInit(): void {
    this.farmRegionService.getAllFarmRegionsHandler();
  }
}
