import type { Coordinate } from '@collectS/geolocation-navigator';

export type Point = { latitude: number; longitude: number; accuracy?: number };

export const maxAcceptableAccuracy = 7; // meters

export const threshold = 3; // meters

export const bufferSize = 5;

//Formula de Haversine
export const twoPointsDistance = (P1: Point, P2: Point): number => {
  const earthRadius = 6371000; // Raio da Terra em metros
  const latitudeDiff = (P2.latitude - P1.latitude) * (Math.PI / 180); // Diferença de latitudes
  const longitudeDiff = (P2.longitude - P1.longitude) * (Math.PI / 180); // Diferença de longitudes

  //O quadrado da metade da distância entre os pontos em uma esfera (levando em conta a curvatura da Terra)
  const haversineConstant =
    Math.sin(latitudeDiff / 2) * Math.sin(latitudeDiff / 2) +
    Math.cos(P1.latitude * (Math.PI / 180)) *
      Math.cos(P2.latitude * (Math.PI / 180)) *
      Math.sin(longitudeDiff / 2) *
      Math.sin(longitudeDiff / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversineConstant), Math.sqrt(1 - haversineConstant));
  const distance = earthRadius * angularDistance;

  return distance;
};

export const getDistance = (P1: Point, P2: Point): number => {
  const earthRadius = 6371000; // Raio da Terra em metros
  const φ1 = (P1.latitude * Math.PI) / 180;
  const φ2 = (P2.latitude * Math.PI) / 180;
  const Δφ = ((P2.latitude - P1.latitude) * Math.PI) / 180;
  const Δλ = ((P2.longitude - P1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c; // in meters
};

export const averagePosition = (buffer: Coordinate[]): Coordinate => {
  const sum = buffer.reduce(
    (acc, pos) => {
      acc.latitude += pos.latitude;
      acc.longitude += pos.longitude;
      return acc;
    },
    { latitude: 0, longitude: 0 }
  );

  return {
    latitude: sum.latitude / buffer.length,
    longitude: sum.longitude / buffer.length,
    accuracy: 0, // placeholder or average if needed
  };
};
