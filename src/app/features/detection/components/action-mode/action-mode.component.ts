import { Component, inject } from '@angular/core';
import { DetectionService } from '../../services/detection.service';
import { identifiers } from '../../../../__mocks__/identifiers';

@Component({
  selector: 'app-action-mode',
  imports: [],
  template: `
    <div class="w-auto h-full">
      <button
        class="btn btn-success text-4xl rounded-lg size-[180px] md:size-[300px]"
        type="button"
        (click)="buildAreaDetailsHandler()">
        <span class="tooltip" data-tip="Detectar área">Deteçção</span>
      </button>
    </div>
  `,
  styles: ``,
})
export class ActionModeComponent {
  public detectionService = inject(DetectionService);

  public buildAreaDetailsHandler(): void {
    this.detectionService.isLoadingMap.set(true);

    setTimeout(() => {
      this.detectionService.isDetectedMode.set(true);
      this.detectionService.identifiers.set(identifiers);
      this.detectionService.isLoadingMap.set(false);
    }, 3000);
  }
}
