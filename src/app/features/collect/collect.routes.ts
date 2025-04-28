import { Routes } from '@angular/router';

import { CollectRegisterComponent } from './views/collect-register/collect-register.component';
import { CollectSearchComponent } from './views/collect-search/collect-search.component';
import { CollectSyncComponent } from './views/collect-sync/collect-sync.component';

export default [
  { path: 'cadastrar', component: CollectRegisterComponent },
  { path: 'consultar', component: CollectSearchComponent },
  { path: 'sincronizar', component: CollectSyncComponent },
] as Routes;
