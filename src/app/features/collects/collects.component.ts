import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-collects',
  templateUrl: './collects.component.html',
  styleUrl: './collects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectsComponent {
  constructor() {}
}
