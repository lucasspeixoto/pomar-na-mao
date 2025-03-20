import { AuthenticationService } from './features/authentication/services/authentication.service';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  provideAppInitializer,
  inject,
  isDevMode,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';

import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzConfig, type NzConfig } from 'ng-zorro-antd/core/config';

registerLocaleData(pt);

const ngZorroConfig: NzConfig = {
  message: { nzDuration: 3000 },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),
    provideRouter(routes, withViewTransitions()),
    provideNzIcons(icons),
    provideNzI18n(pt_BR),
    provideNzConfig(ngZorroConfig),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideAppInitializer(() => inject(AuthenticationService).loadUserData()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
