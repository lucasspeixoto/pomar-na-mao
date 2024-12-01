import { Component, inject } from '@angular/core';

import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ScreenLoaderComponent } from './shared/components/screen-loader/screen-loader.component';
import { ScreenLoaderService } from './shared/services/screen-loader/screen-loader.service';

const COMPONENTS = [ScreenLoaderComponent];

const COMMON = [RouterOutlet];

@Component({
  selector: 'app-root',
  imports: [...COMPONENTS, ...COMMON],
  template: `
    <div class="relative min-h-screen w-full">
      <app-screen-loader />

      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class AppComponent {
  private readonly screenLoaderService = inject(ScreenLoaderService);

  private readonly _router = inject(Router);

  constructor() {
    this._router.events.subscribe(event => {
      window.scrollTo({ top: 0, left: 0 });

      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.screenLoaderService.setLoading(false);
        }, 1000);
      } else if (event instanceof NavigationStart) {
        this.screenLoaderService.setLoading(true);
      }
    });
  }
}
