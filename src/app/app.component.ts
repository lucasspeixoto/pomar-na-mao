import { Component, inject, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectivityComponent } from './shared/components/connectivity/connectivity.component';
import { UpdateService } from './shared/services/update/update.service';
import { NotificationService } from './shared/services/notification/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConnectivityComponent],
  template: `
    <router-outlet />
    <app-connectivity />
  `,
  styles: ``,
})
export class AppComponent implements OnInit {
  public updateService = inject(UpdateService);

  public notificationService = inject(NotificationService);

  public async ngOnInit(): Promise<void> {
    const hasUpdateAvailable = await this.updateService.checkForUpdate();

    if (hasUpdateAvailable) {
      console.log('Atualização disponível!');
      this.notificationService.showNotification('Atualização', {
        body: 'Existe uma atualização disponível!',
      });
    }
  }
}
