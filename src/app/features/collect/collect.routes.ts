import { Routes } from '@angular/router';

import { Register } from './pages/register/register';
import { Search } from './pages/search/search';
import { Sync } from './pages/sync/sync';

export default [
  { path: 'cadastrar', component: Register },
  { path: 'consultar', component: Search },
  { path: 'sincronizar', component: Sync },
] as Routes;
