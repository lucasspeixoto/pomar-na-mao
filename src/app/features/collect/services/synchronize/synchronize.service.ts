import { Injectable, signal } from '@angular/core';
import { PlantData } from '../../models/collect.model';

@Injectable({
  providedIn: 'root',
})
export class SynchronizeService {
  public syncronizeDataFormValue = signal<PlantData | null>(null);

  public setSyncronizeDataFormValue(plantData: PlantData): void {
    this.syncronizeDataFormValue.set(plantData);
  }
}
