import { PlantData } from '../features/inspect-routines/models/plant-data.model';
import { RoutinePlants } from '../features/inspect-routines/models/routine.model';
import { occurenceKeys } from './occurrences';

/**
 * Conta a quantidade de valores diferentes entre objetos PlantData e RoutinePlants,
 * com base na lista de chaves 'occurenceKeys'.
 *
 * @param firstPlant O primeiro objeto PlantData | null.
 * @param secondPlant O segundo objeto RoutinePlants | null.
 * @returns O número de chaves com valores diferentes.
 */
export function countPlantOccurrenceDifferences(
  firstPlant: PlantData | null,
  secondPlant: RoutinePlants | null
): number {
  if (firstPlant !== null && secondPlant !== null) {
    return occurenceKeys.reduce(
      (count, key) => (firstPlant[key] !== secondPlant[key] ? count + 1 : count),
      0
    );
  } else {
    return 0;
  }
}
