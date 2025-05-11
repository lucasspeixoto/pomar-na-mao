import { Component, inject, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectDataResumeComponent } from '../../components/collect-data-resume/collect-data-resume.component';
import { CollectService } from '../../services/collect/collect.service';

@Component({
  selector: 'app-collect',
  imports: [RouterModule, CollectDataResumeComponent],
  template: ` <section>
    <div class="grid grid-cols-12 gap-1 md:gap-8">
      <app-collect-data-resume class="hidden md:contents" />
      <div class="col-span-12">
        <router-outlet />
      </div>
    </div>
  </section>`,
})
export class CollectComponent implements OnInit {
  public collectService = inject(CollectService);

  public ngOnInit(): void {
    this.collectService.getAllCollectsDataHandler();
  }
}
