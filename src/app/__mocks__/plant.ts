import type { CollectComplementDataFormValue } from '../features/collect/constants/collect-complement-data-form';
import type { PlantData } from '../features/collect/models/collect.model';

export const MOCKED_COMPLEMENTS_DATA: CollectComplementDataFormValue = {
  mass: '2.5kg',
  identifier: 'plant-001',
  plantingDate: '2024-02-10',
  harvest: '2024-06-15',
  description: 'Healthy tomato plant ready for harvest.',
};

export const MOCKED_PLANT: PlantData = {
  id: '1',
  created_at: '2024-03-01T12:00:00Z',
  longitude: -46.62529,
  latitude: -23.533773,
  gps_timestamp: 1709308800,
  plant_photo: 'https://example.com/plant1.jpg',
  mass: 2.5,
  harvest: '2024-06-15',
  description: 'Healthy tomato plant ready for harvest.',
  planting_date: '2024-02-10',
  user_id: 'user123',
  users: {
    full_name: 'John Doe',
    email: 'johndoe@example.com',
    avatar_url: 'https://example.com/avatar1.jpg',
  },
};

export const MOCKED_PLANTS: PlantData[] = [
  {
    id: '1',
    created_at: '2024-03-01T12:00:00Z',
    longitude: -46.62529,
    latitude: -23.533773,
    gps_timestamp: 1709308800,
    plant_photo: 'https://example.com/plant1.jpg',
    mass: 2.5,
    harvest: '2024-06-15',
    description: 'Healthy tomato plant ready for harvest.',
    planting_date: '2024-02-10',
    user_id: 'user123',
    users: {
      full_name: 'John Doe',
      email: 'johndoe@example.com',
      avatar_url: 'https://example.com/avatar1.jpg',
    },
  },
  {
    id: '2',
    created_at: '2024-02-20T10:30:00Z',
    longitude: -74.006,
    latitude: 40.7128,
    gps_timestamp: 1708499400,
    plant_photo: 'https://example.com/plant2.jpg',
    mass: 1.8,
    harvest: '2024-05-20',
    description: 'Small basil plant growing well.',
    planting_date: '2024-01-05',
    user_id: 'user456',
    users: {
      full_name: 'Jane Smith',
      email: 'janesmith@example.com',
      avatar_url: 'https://example.com/avatar2.jpg',
    },
  },
  {
    id: '3',
    created_at: '2024-01-15T08:45:00Z',
    longitude: 139.6917,
    latitude: 35.6895,
    gps_timestamp: 1705321500,
    plant_photo: 'https://example.com/plant3.jpg',
    mass: 3.2,
    harvest: '2024-07-10',
    description: 'Lettuce plant growing in urban farm.',
    planting_date: '2023-12-01',
    user_id: 'user789',
    users: {
      full_name: 'Alice Brown',
      email: 'alicebrown@example.com',
      avatar_url: 'https://example.com/avatar3.jpg',
    },
  },
];
