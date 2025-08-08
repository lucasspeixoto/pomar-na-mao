import { Pipe, PipeTransform } from '@angular/core';

export const occurencesLabels: Record<string, string> = {
  stick: 'Galho Seco',
  broken_branch: 'Galho Quebrado',
  vine_growing: 'Cipó crescendo',
  burnt_branch: 'Queimado',
  struck_by_lightning: 'Atingido por raio',
  drill: 'Broca',
  anthill: 'Formigueiro',
  in_experiment: 'Em experimento/teste',
  weeds_in_the_basin: 'Mato na bacia',
  is_dead: 'Planta Morta',
  mites: 'Presença de ácaro',
  thrips: 'Presença de tripes',
  empty_collection_box_near: 'Caixa de colheita vazia perto',
  fertilization_or_manuring: 'Parada de pulverização/adubação',
};

@Pipe({
  name: 'occurence',
})
export class OccurencePipe implements PipeTransform {
  public transform(occurenceAlias: string): string {
    return occurencesLabels[occurenceAlias];
  }
}
