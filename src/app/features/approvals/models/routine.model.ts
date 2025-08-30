import type { PlantData } from './plant-data.model';

export interface Routine {
  id: string;
  user_id: string;
  date: string;
  region: string;
  is_done: boolean;
  approved: boolean;
  created_at: string;
  description: string;
  updated_at: string;
  users: { full_name: string };
}

export interface WorkRoutine extends Routine {
  routine_name: string;
  occurrence: string;
}

export interface RoutineSearchFilters {
  userId: string;
  region: string;
  occurrence: string;
  approved: boolean;
}

export interface RoutinePlants extends PlantData {
  plant_id?: string;
}

export interface WorkRoutinePlants extends RoutinePlants {
  work_routine_id: number;
}

export interface InspectRoutinePlants extends RoutinePlants {
  inspect_routine_id: number;
}
