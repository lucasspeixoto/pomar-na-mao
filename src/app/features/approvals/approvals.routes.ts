import { Routes } from '@angular/router';

import { InspectionRoutines } from './pages/inspection-routines/inspection-routines';
import { WorkRoutines } from './pages/work-routines/work-routines';

export default [
  { path: 'rotinas-de-trabalho', component: WorkRoutines },
  { path: 'rotinas-de-inspecao', component: InspectionRoutines },
] as Routes;
