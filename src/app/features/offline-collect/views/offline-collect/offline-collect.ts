import { PlantUploadStore } from '@collectS/plant-upload-store';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ObservationDataComponent } from '@collectC/observation-form.component';
import { ComplementForm } from '@collectC/complement-form';
import { Geolocation } from '@collectC/geolocation';

import { checkCurrencStorageStep } from '../../../collect/utils/localstorage';
import { OfflineLoginButton } from '@sharedC/offline-login-button.component';
import { PhotoDataComponent } from '@collectC/photo-form';
import { CollectApi } from '@collectS/collect-api';

const PRIMENG = [StepsModule, ButtonModule, StepperModule];

const COMPONENTS = [
  Geolocation,
  ComplementForm,
  ObservationDataComponent,
  OfflineLoginButton,
  PhotoDataComponent,
];

@Component({
  selector: 'app-offline-collect',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './offline-collect.html',
  styles: [
    `
      .card {
        padding: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineCollect {
  public collectService = inject(CollectApi);

  public PlantUploadStore = inject(PlantUploadStore);

  public items = [{ label: 'GPS' }, { label: 'Dados' }, { label: 'Ocorrência' }, { label: 'Foto' }];

  public activeIndex = signal(checkCurrencStorageStep());

  public onActiveIndexChange(event: number): void {
    this.activeIndex.set(event);
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex().toString());
  }

  public goToPreviousStep(): void {
    this.activeIndex.update(item => item - 1);
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex().toString());
  }

  public goToNextStep(): void {
    this.activeIndex.update(item => item + 1);
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex().toString());
  }

  public insertOfflineCollectHandler(): void {
    this.collectService.storageAPlantCollectHandler();
    this.activeIndex.set(0);
    this.PlantUploadStore.resetSelectedImage();
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex().toString());
  }
}
