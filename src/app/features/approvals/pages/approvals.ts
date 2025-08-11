import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-work-routines',
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
export class Approvals {}
