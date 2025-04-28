/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './app/layout/service/layout.service';
import { isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from './app/pages/loading/loading.component';
import { LoadingService } from './app/services/loading/loading.service';
import { ToastModule } from 'primeng/toast';
import { ConnectivityComponent } from './app/components/connectivity/connectivity.component';
import { NotificationService } from './app/services/notification/notification.service';
import { UpdateService } from './app/services/update/update.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ButtonModule, LoadingComponent, ConnectivityComponent, ToastModule],
  template: `<div>
    <p-toast />
    <router-outlet />
    <app-loading [isLoading]="loadingService.isLoading()" />
    <app-connectivity />
    <div class="installer">
      @if (showInstallButton) {
        <p-button
          (click)="installPWA()"
          icon="pi pi-download"
          [rounded]="true"
          severity="success" />
      }
    </div>
  </div>`,
  styles: [
    `
      .installer {
        > p-button {
          position: fixed;
          top: 17px;
          right: 17px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          z-index: 1000;

          @media (max-width: 400px) {
            width: 25px;
            height: 25px;
          }

          &::hover {
            transform: scale(1.1);
          }
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public loadingService = inject(LoadingService);

  public updateService = inject(UpdateService);

  public notificationService = inject(NotificationService);

  private platformId = inject(PLATFORM_ID);

  public deferredPrompt!: any;

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

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallButton = true; // Show your custom Install button
    });
  }

  public installPWA(): void {
    this.loadingService.isLoading.set(true);

    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.warn('Instalação aceita!');
        } else {
          console.warn('Instalação rejeitada!');
        }
        this.deferredPrompt = null;
      });
    }

    this.loadingService.isLoading.set(false);
  }
}
