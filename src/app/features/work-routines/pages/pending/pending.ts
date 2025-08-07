import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pending',
  imports: [],
  templateUrl: './pending.html',
  styles: [
    `
      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }

        .p-dialog-header {
          padding: 0rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pending {}
