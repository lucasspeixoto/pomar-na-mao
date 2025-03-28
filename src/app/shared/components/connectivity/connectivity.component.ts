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
    effect(() => {
      if (!this.connectivityService.isOnline()) {
        this.notificationService.showNotification('Acesso a internet', {
          body: 'Você está offline',
        });

        return;
      }

      this.notificationService.showNotification('Acesso a internet', {
        body: 'Você está online!',
      });
    });
  }
}
