import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  imports: [],
  template: `<p>reports works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {}
