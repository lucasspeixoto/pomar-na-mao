import { User } from '../../../shared/models/user.model';

export interface PlantData {
  id: string;
  created_at: string;
  longitude: number;
  latitude: number;
  gps_timestamp: number;
  plant_photo: string;
  mass: number;
  harvest: string;
  description: string;
  planting_date: string;
  user_id: string;
  users: Partial<User>;
}
