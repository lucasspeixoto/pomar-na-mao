import { Routes } from '@angular/router';
import { CollectComponent } from './view/collect/collect.component';

import { SynchronizeComponent } from './view/synchronize/synchronize.component';
import { SearchCollectsComponent } from './view/search-collects/search-collects.component';

export const COLLECT_ROUTES: Routes = [
  { path: 'register', component: CollectComponent },
  { path: 'consultar', component: SearchCollectsComponent },
  { path: 'sincronizar', component: SynchronizeComponent },
];
