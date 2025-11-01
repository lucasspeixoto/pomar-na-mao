import { Component, Input } from '@angular/core';
import { occurenceKeys, occurencesLabels } from '../../../../utils/occurrences';
import type { PlantData } from '../../../plants/models/plant-data';

@Component({
  selector: 'app-plant-ocurrences-list',
  imports: [],
  templateUrl: './plant-ocurrences-list.component.html',
})
export class PlantOcurrencesListComponent {
  @Input() public selectedPlantInComparison!: PlantData | null;

  public occurenceKeys = occurenceKeys;

  public occurencesLabels = occurencesLabels;
}
