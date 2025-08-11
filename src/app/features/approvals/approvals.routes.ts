import { Routes } from '@angular/router';

import { PunctualMarkings } from './pages/punctual-markings/punctual-markings';
import { WorkRoutines } from './pages/work-routines/work-routines';

export default [
  { path: 'rotinas-de-trabalho', component: WorkRoutines },
  { path: 'marcacoes-pontuais', component: PunctualMarkings },
] as Routes;
