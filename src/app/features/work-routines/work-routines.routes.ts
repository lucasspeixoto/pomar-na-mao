import { Routes } from '@angular/router';

import { Pending } from './pages/pending/pending';
import { Completed } from './pages/completed/completed';

export default [
  { path: 'pendentes', component: Pending },
  { path: 'finalizadas', component: Completed },
] as Routes;
