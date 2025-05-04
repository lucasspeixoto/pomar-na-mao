import { Component, effect, inject } from '@angular/core';
import { ConnectivityService } from '../../services/connectivity/connectivity.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-connectivity',
  templateUrl: './connectivity.component.html',
  styleUrls: ['./connectivity.component.scss'],
})
export class ConnectivityComponent {
  public connectivityService = inject(ConnectivityService);

  public notificationService = inject(NotificationService);

  public previousStatus: boolean | null = null;

  constructor() {
    effect(() => {
      const currentStatus = this.connectivityService.isOnline();

      if (currentStatus !== this.previousStatus) {
        if (!currentStatus) {
          this.notificationService.showNotification('Acesso a internet', {
            body: 'Você está offline',
            icon: '/assets/icons/icon-72x72.png',
          });
        } else {
          this.notificationService.showNotification('Acesso a internet', {
            body: 'Você está online!',
            icon: '/assets/icons/icon-72x72.png',
          });
        }
        this.previousStatus = currentStatus;
      }
    });
  }
}
