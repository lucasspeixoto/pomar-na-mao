import { Injectable, signal } from '@angular/core';
import { CollectGeolocationDataFormValue } from '@collectCs/collect-geolocation-data-form';

@Injectable({
  providedIn: 'root',
})
export class GeolocationStore {
  private collectGeolocationDataFormValue = signal<CollectGeolocationDataFormValue | null>(null);

  public getCollectGeolocationDataFormValue(): CollectGeolocationDataFormValue | null {
    return this.collectGeolocationDataFormValue();
  }

  public setCollectGeolocationDataFormValue(value: CollectGeolocationDataFormValue | null): void {
    this.collectGeolocationDataFormValue.set(value);
  }
}
