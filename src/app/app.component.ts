import { Component, inject } from '@angular/core';

import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ScreenLoaderComponent } from './shared/components/screen-loader/screen-loader.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { ScreenLoaderService } from './shared/services/screen-loader/screen-loader.service';

const COMPONENTS = [ThemeToggleComponent, ScreenLoaderComponent];

@Component({
  selector: 'app-root',
  imports: [...COMPONENTS],
  template: `
    <div class="relative min-h-screen w-full">
      <app-screen-loader />

      <app-theme-toggle />

      <div class="card card-compact w-96 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button type="button" class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
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
