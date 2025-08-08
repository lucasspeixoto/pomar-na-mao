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
