import { PlantData } from '@collectM/collect.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'occurrences',
})
export class OccurrencesPipe implements PipeTransform {
  public transform(collect: PlantData): number {
    const {
      stick,
      broken_branch,
      vine_growing,
      burnt_branch,
      struck_by_lightning,
      drill,
      anthill,
      in_experiment,
      weeds_in_the_basin,
      fertilization_or_manuring,
      mites,
      thrips,
      empty_collection_box_near,
    } = collect;

    const observationDataForm = {
      stick,
      brokenBranch: broken_branch,
      vineGrowing: vine_growing,
      burntBranch: burnt_branch,
      struckByLightning: struck_by_lightning,
      drill,
      anthill,
      inExperiment: in_experiment,
      weedsInTheBasin: weeds_in_the_basin,
      fertilizationOrManuring: fertilization_or_manuring,
      mites,
      thrips,
      emptyCollectionBoxNear: empty_collection_box_near,
    };

    return Object.values(observationDataForm).filter(value => value === true).length;
  }
}
