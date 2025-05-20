import { Routes } from '@angular/router';

import { RegisterComponent } from './views/register/register.component';
import { SearchComponent } from './views/search/search.component';
import { SyncComponent } from './views/sync/sync.component';

export default [
  { path: 'cadastrar', component: RegisterComponent },
  { path: 'consultar', component: SearchComponent },
  { path: 'sincronizar', component: SyncComponent },
] as Routes;
