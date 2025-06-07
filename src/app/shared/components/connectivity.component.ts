import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ConnectivityStatus } from '@sharedS/connectivity-status';
import { NotificationPush } from '@sharedS/notification-push';

@Component({
  selector: 'app-connectivity',
  template: `
    <div class="container">
      <div class="container__fixed-icon">
        @if (ConnectivityStatus.isOnline()) {
          <img src="assets/images/online.png" alt="Online logo" />
        } @else {
          <img src="assets/images/offline.png" alt="Offline logo" />
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        &__fixed-icon {
          position: fixed;
          bottom: 15px;
          right: 15px;
          width: 25px;
          height: 25px;
          cursor: pointer;
          z-index: 1000;

          @media (max-width: 400px) {
            width: 18px;
            height: 18px;
          }

          &::hover {
            transform: scale(1.1);
          }

          > img {
            width: 100%;
            height: auto;
            border-radius: 50%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease-in-out;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Connectivity {
  public ConnectivityStatus = inject(ConnectivityStatus);

  public NotificationPush = inject(NotificationPush);

  constructor() {
    effect(() => {
      if (!this.ConnectivityStatus.isOnline()) {
        this.NotificationPush.showNotification('Acesso a internet', {
          body: 'Você está offline',
          icon: '/assets/icons/icon-72x72.png',
        });
      } else {
        this.NotificationPush.showNotification('Acesso a internet', {
          body: 'Você está online!',
          icon: '/assets/icons/icon-72x72.png',
        });
      }
    });
  }
}
