/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './app/layout/service/layout.service';
import { isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from './app/pages/loading/loading.component';
import { LoadingService } from './app/services/loading/loading.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConnectivityComponent } from './app/components/connectivity/connectivity.component';
import { NotificationService } from './app/services/notification/notification.service';
import { UpdateService } from './app/services/update/update.service';
import { CacheInspectorService } from './app/services/cache-inspector/cache-inspector.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ButtonModule, LoadingComponent, ConnectivityComponent, ToastModule],
  template: `<div>
    <p-toast />
    <router-outlet />
    <app-loading [isLoading]="loadingService.isLoading()" />
    <app-connectivity />
  </div>`,
  styles: [],
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public loadingService = inject(LoadingService);

  public updateService = inject(UpdateService);

  public notificationService = inject(NotificationService);

  private cacheInspector = inject(CacheInspectorService);

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
      });
    }

    /* window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.installPrompt = event;
      this.showInstallButton = true;
    }); */

    this.cacheInspector.checkAssetsCache();
  }

  /* public async installPWA(): Promise<void> {
    this.loadingService.isLoading.set(true);

    if (this.installPrompt) {
      await this.installPrompt.prompt();
    }

    this.loadingService.isLoading.set(false);
  } */
}
