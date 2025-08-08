import { Routes } from '@angular/router';

import { Plants } from './pages/plants/plants';
import { Approvals } from './pages/approvals/approvals';

export default [
  { path: 'aprovacoes', component: Approvals },
  { path: 'plantas', component: Plants },
] as Routes;
