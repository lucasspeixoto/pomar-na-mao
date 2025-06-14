import { Injectable, signal } from '@angular/core';
import {
  CollectObservationDataFormValue,
  initialCollectObservationData,
} from '@collectCs/collect-observation-data-form';

@Injectable({
  providedIn: 'root',
})
export class ObservationStore {
  private collectObservationDataFormValue = signal<CollectObservationDataFormValue>(
    initialCollectObservationData
  );

  public getCollectObservationDataFormValue(): CollectObservationDataFormValue {
    return this.collectObservationDataFormValue();
  }

  public setCollectObservationDataFormValue(value: CollectObservationDataFormValue): void {
    this.collectObservationDataFormValue.set(value);
  }
}
