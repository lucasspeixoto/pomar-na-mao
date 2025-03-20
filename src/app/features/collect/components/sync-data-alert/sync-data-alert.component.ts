import { Component, input } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-sync-data-alert',
  imports: [NzAlertModule],
  template: `
    @if (totalCollectedData() > 0) {
      <nz-alert
        nzShowIcon
        nzType="info"
        nzMessage="Aviso"
        [nzDescription]="descriptionTemplate2"></nz-alert>
      <ng-template #descriptionTemplate2>
        <p>
          Existem <strong>{{ totalCollectedData() }}</strong> coletas para sincronizar, faça isso de
          uma única vez ou item por item
        </p>
      </ng-template>
    }
  `,
})
export class SyncDataAlertComponent {
  public totalCollectedData = input.required<number>();
}
