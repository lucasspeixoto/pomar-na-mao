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
import { InstallPwaButtonComponent } from './app/components/install-pwa-button/install-pwa-button.component';
//import { CacheInspectorService } from './app/services/cache-inspector/cache-inspector.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    ButtonModule,
    LoadingComponent,
    InstallPwaButtonComponent,
    ConnectivityComponent,
    ToastModule,
  ],
  template: ` <p-toast styleClass="hidden md:block" position="top-right" />
    <p-toast styleClass="md:hidden block" position="top-center" />
    <app-install-pwa-button />
    <div>
      <router-outlet />
      <app-loading [isLoading]="loadingService.isLoading()" />
      <app-connectivity />
    </div>`,
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public loadingService = inject(LoadingService);

  public updateService = inject(UpdateService);

  public notificationService = inject(NotificationService);

  //private cacheInspector = inject(CacheInspectorService);

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

    //this.cacheInspector.checkAssetsCache();
  }
}
