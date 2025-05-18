import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectDataResumeComponent } from '../components/collect-data-resume/collect-data-resume.component';
import { FarmRegionService } from '../services/farm-region/farm-region.service';

@Component({
  selector: 'app-collect',
  imports: [RouterModule, CollectDataResumeComponent],
  template: ` <section>
    <div class="grid grid-cols-12 gap-2">
      <app-collect-data-resume class="hidden md:contents" />
      <div class="col-span-12 mt-4">
        <router-outlet />
      </div>
    </div>
  </section>`,
})
export class CollectComponent implements OnInit {
  public farmRegionService = inject(FarmRegionService);

  public ngOnInit(): void {
    this.farmRegionService.getAllFarmRegionsHandler();
  }
}
