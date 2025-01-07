import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetectionComponent } from '../detection/components/detection/detection.component';

@Component({
  selector: 'app-home',
  imports: [DetectionComponent],
  template: `
    <div class="w-full" style="height: calc(100vh - 4rem)">
      <div
        class="p-4 md:p-8 lg:p-12 gap-2 flex h-full w-full flex-col items-center lg:flex-row">
        <div
          class="border-2 border-red-400 h-full w-full md:w-1/2 flex items-center justify-center p-0 md:p-2 overflow-none rounded-box">
          <app-detection />
        </div>
        <div class="divider divider-horizontal"></div>
        <div
          class="border-2 border-orange-400 h-full w-full md:w-1/2 flex items-center justify-center p-0 md:p-2 overflow-none rounded-box">
          Conteúdo 2
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
