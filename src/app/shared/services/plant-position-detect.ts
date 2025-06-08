import { inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { twoPointsDistance, Point } from '@sharedU/geolocation-math';
import { LoadingStore } from '@sharedS/loading-store';
import { PlantData } from '@collectM/collect.model';
import { CollectApi } from '@collectS/collect-api';
import { GeolocationNavigator } from '@collectS/geolocation-navigator';

@Injectable({
  providedIn: 'root',
})
export class PlantPositionDetect {
  public geolocationNavigator = inject(GeolocationNavigator);

  public collectService = inject(CollectApi);

  public loadingStore = inject(LoadingStore);

  public messageService = inject(MessageService);

  private _detectedColledtId = signal<string | null>(null);

  public detectedColledtId = this._detectedColledtId.asReadonly();

  public filteredCollectData = this.collectService.filteredCollectData;

  public setDetectedColledtId(id: string): void {
    this._detectedColledtId.set(id);
  }

  public detectNearestCollect(showMessage: boolean): PlantData | null {
    this.loadingStore.startLoading();

    const currentPosition = this.geolocationNavigator.coordinates();

    if (!currentPosition) {
      this.messageService.add({
        severity: 'info',
        summary: 'Sem Localização',
        detail: 'Não foi possível detectar sua localização. Ative o GPS e tente novamente.',
        life: 3000,
      });

      this.loadingStore.stopLoading();

      return null;
    }

    const userPoint: Point = {
      latitude: currentPosition?.latitude,
      longitude: currentPosition?.longitude,
    };

    let nearestCollect = this.filteredCollectData()[0];

    const firstCollectPoint: Point = {
      latitude: nearestCollect.latitude,
      longitude: nearestCollect.longitude,
    };

    let minimumDistance = twoPointsDistance(userPoint, firstCollectPoint);

    for (const collect of this.filteredCollectData().slice(1)) {
      const collectPoint: Point = {
        latitude: collect.latitude,
        longitude: collect.longitude,
      };

      const distance = twoPointsDistance(userPoint, collectPoint);

      if (distance < minimumDistance) {
        minimumDistance = distance;
        nearestCollect = collect;
      }
    }

    this.loadingStore.stopLoading();

    if (showMessage) {
      this.messageService.add({
        severity: 'success',
        summary: 'Coleta encontrada',
        detail: `A planta mais próxima, ${nearestCollect.id.split('-')[0]}, está a ${minimumDistance.toFixed(2)} metros`,
        life: 3000,
      });
    }

    return nearestCollect;
  }
}
