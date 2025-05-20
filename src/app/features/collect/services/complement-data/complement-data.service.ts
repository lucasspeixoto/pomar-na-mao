import { Injectable, signal } from '@angular/core';
import { CollectComplementDataFormValue } from '@collectCs/collect-complement-data-form';

@Injectable({
  providedIn: 'root',
})
export class ComplementDataService {
  private collectComplementDataFormValue = signal<CollectComplementDataFormValue | null>(null);

  public getCollectComplementDataFormValue(): CollectComplementDataFormValue | null {
    return this.collectComplementDataFormValue();
  }

  public setCollectComplementDataFormValue(value: CollectComplementDataFormValue | null): void {
    this.collectComplementDataFormValue.set(value);
  }
}
