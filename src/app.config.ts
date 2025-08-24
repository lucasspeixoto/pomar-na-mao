import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ptBrTranslation } from './app/shared/utils/pt-br';
import { LayoutConfig } from 'src/app/core/layout/layout-config';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    provideAppInitializer(() => inject(LayoutConfig).setInitialStorageTheme()),
    providePrimeNG({
      translation: ptBrTranslation,
      theme: { preset: Lara, options: { darkModeSelector: '.app-dark' } },
    }),
  ],
};
