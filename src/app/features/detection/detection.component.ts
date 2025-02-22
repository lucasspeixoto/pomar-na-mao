import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrl: './detection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetectionComponent {}
