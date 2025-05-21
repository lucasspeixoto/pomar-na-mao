/*
 * Formula de Haversine
 */

export type Point = { latitude: number; longitude: number };

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
