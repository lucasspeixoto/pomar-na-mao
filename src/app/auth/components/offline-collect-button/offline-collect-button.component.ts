import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConnectivityService } from '@sharedS/connectivity/connectivity.service';

@Component({
  selector: 'app-offline-collect-button',
  imports: [ButtonModule, RouterLink],
  template: `
    <section class="offline-collect-button flex justify-center w-full">
      <p-button
        routerLink="/coleta-offline"
        icon="pi pi-box"
        label="Coleta offline"
        [raised]="true"
        severity="secondary" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .offline-collect-button {
        .p-button {
          min-width: 100vw;

          @media (min-width: 576px) {
            min-width: 350px;
          }
        }
      }
    `,
  ],
})
export class ToolbarServicesComponent {
  public connectivityService = inject(ConnectivityService);
}
