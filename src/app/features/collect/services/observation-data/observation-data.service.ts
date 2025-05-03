import { Injectable, signal } from '@angular/core';
import {
  CollectObservationDataFormValue,
  initialCollectObservationData,
} from '../../../../features/collect/constants/collect-observation-data-form';

@Injectable({
  providedIn: 'root',
})
export class ObservationDataService {
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
