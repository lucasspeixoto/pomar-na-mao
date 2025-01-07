import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DetectionService } from '../../services/detection.service';
import { AreaMapComponent } from '../area-map/area-map.component';
import { ActionModeComponent } from '../action-mode/action-mode.component';

@Component({
  selector: 'app-detection',
  imports: [ActionModeComponent, AreaMapComponent],
  template: `
    <div class="z-0 m-4 overflow-hidden">
      @if (detectionService.isLoadingMap()) {
        <div class="flex flex-col items-center justify-center gap-1">
          <div class="flex items-center justify-center gap-2">
            <span>Carregando mapas</span>
            <span class="loading loading-ring loading-md">...</span>
          </div>
          <progress class="progress w-56"></progress>
        </div>
      } @else {
        @if (!detectionService.isDetectedMode()) {
          <app-action-mode />
        } @else {
          <app-area-map />
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetectionComponent {
  public detectionService = inject(DetectionService);
}
