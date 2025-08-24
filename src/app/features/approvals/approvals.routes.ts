import { Routes } from '@angular/router';

import { WorkRoutineList } from './pages/work-routines/work-routine-list/work-routine-list';

import { InspectionRoutineList } from './pages/inspection-routines/inspection-routine-list/inspection-routine-list';

export default [
  {
    path: 'rotinas-de-trabalho',
    component: WorkRoutineList,
  },
  {
    path: 'rotinas-de-inspecao',
    component: InspectionRoutineList,
  },
] as Routes;
