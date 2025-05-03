import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectDataResumeComponent } from '../../components/collect-data-resume/collect-data-resume.component';

@Component({
  selector: 'app-collect',
  imports: [RouterModule, CollectDataResumeComponent],
  template: ` <section>
    <div class="grid grid-cols-12 gap-1 md:gap-8">
      <app-collect-data-resume class="contents" />
      <div class="col-span-12">
        <router-outlet />
      </div>
    </div>
  </section>`,
})
export class CollectComponent {}
