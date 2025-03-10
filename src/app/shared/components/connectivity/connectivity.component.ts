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

  constructor() {
    effect(async () => {
      if (!this.connectivityService.isOnline()) {
        await this.notificationService.showNotification('You are offline', {
          body: 'Você está offline',
        });

        return;
      }

      await this.notificationService.showNotification('You are online', {
        body: 'Você está online!',
      });
    });
  }
}
