import type { BooleanKeys } from '../features/inspect-routines/models/plant-data.model';
import type { Option } from '../shared/components/form/select/select.component';

export const occurenceKeys: BooleanKeys[] = [
  'anthill',
  'broken_branch',
  'burnt_branch',
  'drill',
  'empty_collection_box_near',
  'fertilization_or_manuring',
  'in_experiment',
  'is_dead',
  'mites',
  'stick',
  'struck_by_lightning',
  'thrips',
  'vine_growing',
  'weeds_in_the_basin',
  'is_new',
  'non_existent',
  'frost',
  'flowers',
  'buds',
  'dehydrated',
];

export const occurencesLabels: Record<string, string> = {
  anthill: 'Formigueiro',
  broken_branch: 'Galho Quebrado',
  burnt_branch: 'Galho Queimado',
  drill: 'Broca',
  empty_collection_box_near: 'Caixa de colheita vazia perto',
  fertilization_or_manuring: 'Parada de pulverização/adubação',
  in_experiment: 'Em experimento/teste',
  is_dead: 'Planta Morta',
  mites: 'Presença de ácaro',
  stick: 'Galho Seco',
  struck_by_lightning: 'Atingido por raio',
  thrips: 'Presença de tripes',
  vine_growing: 'Cipó crescendo',
  weeds_in_the_basin: 'Mato na bacia',
  is_new: 'Pé novo (Novo)',
  non_existent: 'Pé Inexistente (Novo)',
  frost: 'Atingido por Geada (Novo)',
  flowers: 'Presença de Flores (Novo)',
  buds: 'Presença de Brotos (Novo)',
  dehydrated: 'Pé Desidratado (Novo)',
};

export const occurencesOptions: Option[] = Object.entries(occurencesLabels).map(([key, value]) => ({
  value: key,
  label: value,
}));
