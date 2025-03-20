import { Injectable, signal } from '@angular/core';
import { CollectComplementDataFormValue } from '../../../features/collect/constants/collect-complement-data-form';

@Injectable({
  providedIn: 'root',
})
export class ComplementDataService {
  private collectComplementDataFormValue = signal<CollectComplementDataFormValue | null>(null);

  public getCollectComplementDataFormValue(): CollectComplementDataFormValue | null {
    return this.collectComplementDataFormValue();
  }

  public setCollectComplementDataFormValue(value: CollectComplementDataFormValue): void {
    this.collectComplementDataFormValue.set(value);
  }
}
