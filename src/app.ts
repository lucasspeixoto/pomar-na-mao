/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutConfig } from 'src/app/core/layout/layout-config';
import { isPlatformBrowser } from '@angular/common';
import { Loading } from '@sharedP/loading/loading';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NotificationPush } from '@sharedS/notification-push';
import { AppUpdate } from '@sharedS/app-update';
import { Connectivity } from '@sharedC/connectivity.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ButtonModule, Loading, Connectivity, ToastModule],
  template: ` <p-toast styleClass="hidden md:block" position="top-right" />
    <p-toast styleClass="md:hidden block" position="top-center" />
    <div>
      <router-outlet />
      <app-loading />
      <app-connectivity />
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutConfig);

  public AppUpdate = inject(AppUpdate);

  public NotificationPush = inject(NotificationPush);

  private platformId = inject(PLATFORM_ID);

  public installPrompt!: any;

  public showInstallButton = false;

  public async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.startAppConfig();
    }

    const hasUpdateAvailable = await this.AppUpdate.checkForUpdate();

    if (hasUpdateAvailable) {
      this.NotificationPush.showNotification('Atualização', {
        body: 'Existe uma atualização disponível!',
        icon: '/assets/icons/icon-72x72.png',
      });
    }
  }
}
