/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@layoutS/layout.service';
import { isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from '@sharedP/loading/loading.component';
import { LoadingService } from '@sharedS/loading/loading.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '@sharedS/notification/notification.service';
import { UpdateService } from '@sharedS/update/update.service';
import { ConnectivityComponent } from '@sharedC/connectivity/connectivity.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ButtonModule, LoadingComponent, ConnectivityComponent, ToastModule],
  template: ` <p-toast styleClass="hidden md:block" position="top-right" />
    <p-toast styleClass="md:hidden block" position="top-center" />
    <div>
      <router-outlet />
      <app-loading [isLoading]="loadingService.isLoading()" />
      <app-connectivity />
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public loadingService = inject(LoadingService);

  public updateService = inject(UpdateService);

  public notificationService = inject(NotificationService);

  private platformId = inject(PLATFORM_ID);

  public installPrompt!: any;

  public showInstallButton = false;

  public async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.startAppConfig();
    }

    const hasUpdateAvailable = await this.updateService.checkForUpdate();

    if (hasUpdateAvailable) {
      this.notificationService.showNotification('Atualização', {
        body: 'Existe uma atualização disponível!',
        icon: '/assets/icons/icon-72x72.png',
      });
    }
  }
}
