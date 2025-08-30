interface User {
  id: string;
  updated_at: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
}

export interface PlantData {
  was_updated: boolean;
  id: string;
  created_at: string;
  longitude: number;
  latitude: number;
  gps_timestamp: number;
  photo_file: File | null | string;
  mass: string;
  variety: string;
  harvest: string;
  description: string;
  planting_date: string;
  user_id: string;
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
  region: string;
  empty_collection_box_near: boolean;
  is_dead: boolean;
  last_work: string;
  users: Partial<User>;
}

export interface Position {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface PlantsMarker {
  id: string;
  latitude: number;
  longitude: number;
}

export type BooleanKeys = {
  [K in keyof PlantData]: PlantData[K] extends boolean ? K : never;
}[keyof PlantData];
