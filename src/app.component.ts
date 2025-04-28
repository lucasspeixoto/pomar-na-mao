import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './app/layout/service/layout.service';
import { isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from './app/pages/loading/loading.component';
import { LoadingService } from './app/services/loading/loading.service';
import { ToastModule } from 'primeng/toast';
import { ConnectivityComponent } from './app/components/connectivity/connectivity.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LoadingComponent, ConnectivityComponent, ToastModule],
  template: `<div>
    <p-toast />
    <router-outlet />
    <app-loading [isLoading]="loadingService.isLoading()" />
    <app-connectivity />
  </div>`,
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public loadingService = inject(LoadingService);

  private platformId = inject(PLATFORM_ID);

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.startAppConfig();
    }
  }
}
