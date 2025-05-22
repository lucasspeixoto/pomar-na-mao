import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FarmRegionService } from '@collectS/farm-region/farm-region.service';

@Component({
  selector: 'app-collect',
  imports: [RouterModule],
  template: ` <section>
    <div class="grid grid-cols-12">
      <!-- <app-data-resume class="hidden md:contents" /> -->
      <div class="col-span-12 mt-4 md:mt-0">
        <router-outlet />
      </div>
    </div>
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectComponent implements OnInit {
  public farmRegionService = inject(FarmRegionService);

  public ngOnInit(): void {
    this.farmRegionService.getAllFarmRegionsHandler();
  }
}
