import { Component, inject } from '@angular/core';
import { DetectionService } from '../../services/detection.service';

@Component({
  selector: 'app-area-map',
  imports: [],
  template: `
    <button
      type="button"
      class="btn btn-active btn-link"
      (click)="detectionService.isDetectedMode.set(false)">
      Limpar
    </button>
  `,
  styles: ``,
})
export class AreaMapComponent {
  public detectionService = inject(DetectionService);
}
