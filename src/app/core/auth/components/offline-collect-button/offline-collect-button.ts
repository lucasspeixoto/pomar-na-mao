import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConnectivityStatus } from '@sharedS/connectivity-status';

@Component({
  selector: 'app-offline-collect-button',
  imports: [ButtonModule, RouterLink],
  template: `
    <section class="offline-collect-button flex justify-center items-center w-full">
      <p-button
        routerLink="/coleta-offline"
        label="Coleta offline"
        [raised]="true"
        severity="secondary">
        <img width="15px" height="15px" alt="Box" src="assets/images/open-box.png" />
      </p-button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .offline-collect-button {
        .p-button {
          min-width: 90vw;

          @media (min-width: 576px) {
            min-width: 350px;
          }
        }
      }
    `,
  ],
})
export class OfflineCollectButton {
  public ConnectivityStatus = inject(ConnectivityStatus);
}
