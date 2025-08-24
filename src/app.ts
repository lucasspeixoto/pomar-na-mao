/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutConfig } from 'src/app/core/layout/layout-config';
import { isPlatformBrowser } from '@angular/common';
import { Loading } from '@sharedP/loading/loading';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ButtonModule, Loading, ToastModule],
  template: ` <p-toast class="hidden md:block" position="top-right" />
    <p-toast class="md:hidden block" position="top-center" />
    <div>
      <router-outlet />
      <app-loading />
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutConfig);

  private platformId = inject(PLATFORM_ID);

  public async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.startAppConfig();
    }
  }
}
