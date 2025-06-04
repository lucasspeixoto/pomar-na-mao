import { User } from 'src/app/shared/models/user.model';

export interface PlantData {
  id: string;
  created_at: string;
  longitude: number;
  latitude: number;
  gps_timestamp: number;
  photo_file: File | null;
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
  users: Partial<User>;
}
