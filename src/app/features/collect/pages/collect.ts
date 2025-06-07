import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FarmRegionApi } from '@collectS/farm-region-api';

@Component({
  selector: 'app-collect',
  imports: [RouterModule],
  template: ` <section>
    <div class="grid grid-cols-12">
      <div class="col-span-12 mt-4 md:mt-0">
        <router-outlet />
      </div>
    </div>
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Collect implements OnInit {
  public farmRegionApi = inject(FarmRegionApi);

  public ngOnInit(): void {
    this.farmRegionApi.getAllFarmRegionsHandler();
  }
}
