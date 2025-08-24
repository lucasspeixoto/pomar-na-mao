export interface WorkRoutine {
  id: string;
  user_id: string;
  date: string;
  region: string;
  occurrence: string;
  routine_name: string;
  is_done: boolean;
  approved: boolean;
  created_at: string;
  users: { full_name: string };
}

export interface WorkRoutineSearchFilters {
  userId: string;
  region: string;
  occurrence: string;
  approved: boolean;
}

export interface WorkRoutinePlants {
  id: string;
  plant_id: string;
  work_routine_id: number;
  created_at: string;
  longitude: number;
  latitude: number;
  gps_timestamp: number;
  mass: string;
  variety: string;
  harvest: string;
  description: string;
  planting_date: string;
  life_of_the_tree: string;
  stick: boolean;
  broken_branch: boolean;
  vine_growing: boolean;
  burnt_branch: boolean;
  struck_by_lightning: boolean;
  drill: boolean;
  anthill: boolean;
  in_experiment: boolean;
  weeds_in_the_basin: boolean;
  fertilization_or_manuring: boolean;
  mites: boolean;
  thrips: boolean;
  empty_collection_box_near: boolean;
  is_dead: boolean;
  region: string;
}
