import { inject, Injectable } from '@angular/core';
import { CollectService } from '@collectS/collect/collect.service';
import { GeolocationService } from '@collectS/geolocation/geolocation.service';
import { twoPointsDistance, type Point } from '../../utils/geolocation-math';
import { LoadingService } from '@sharedS/loading/loading.service';
import { MessageService } from 'primeng/api';
import { PlantData } from '@collectM/collect.model';

@Injectable({
  providedIn: 'root',
})
export class DetectionService {
  public geolocationService = inject(GeolocationService);

  public collectService = inject(CollectService);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public filteredCollectData = this.collectService.filteredCollectData;

  public detectNearestCollect(): PlantData | null {
    this.loadingService.isLoading.set(true);

    // Update user position
    this.geolocationService.getLocaltionCoordinate();

    const currentPosition = this.geolocationService.coordinates();

    if (!currentPosition) {
      this.messageService.add({
        severity: 'info',
        summary: 'Sem Localização',
        detail: 'Não foi possível detectar sua localização. Ative o GPS e tente novamente.',
        life: 3000,
      });
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

    this.loadingService.isLoading.set(false);

    this.messageService.add({
      severity: 'success',
      summary: 'Coleta encontrada',
      detail: `A planta mais próxima, ${nearestCollect.id.split('-')[0]}, está a ${minimumDistance.toFixed(2)} metros`,
      life: 3000,
    });

    return nearestCollect;
  }
}
