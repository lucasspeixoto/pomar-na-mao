import { Routes } from '@angular/router';

import { WorkRoutineList } from './pages/work-routines/work-routine-list/work-routine-list';

import { InspectRoutineList } from './pages/inspection-routines/inspect-routine-list/inspect-routine-list';

export default [
  {
    path: 'rotinas-de-trabalho',
    component: WorkRoutineList,
  },
  {
    path: 'rotinas-de-inspecao',
    component: InspectRoutineList,
  },
] as Routes;
