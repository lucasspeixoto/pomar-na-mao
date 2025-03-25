import { Injectable, signal } from '@angular/core';
import { CollectObservationDataFormValue } from '../../../../features/collect/constants/collect-observation-data-form';

@Injectable({
  providedIn: 'root',
})
export class ObservationDataService {
  private collectObservationDataFormValue = signal<CollectObservationDataFormValue | null>(null);

  public getCollectObservationDataFormValue(): CollectObservationDataFormValue | null {
    return this.collectObservationDataFormValue();
  }

  public setCollectObservationDataFormValue(value: CollectObservationDataFormValue): void {
    this.collectObservationDataFormValue.set(value);
  }
}
