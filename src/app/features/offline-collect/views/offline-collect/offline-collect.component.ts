import { Component, inject } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CollectObservationDataComponent } from 'src/app/features/collect/components/collect-observation-data/collect-observation-data.component';
import { CollectComplementDataComponent } from 'src/app/features/collect/components/collect-complement-data/collect-complement-data.component';
import { CollectGeolocationComponent } from 'src/app/features/collect/components/collect-geolocation/collect-geolocation.component';
import { CollectService } from 'src/app/features/collect/services/collect/collect.service';
import { checkCurrencStorageStep } from 'src/app/features/collect/utils/localstorage';
import { RouterLink } from '@angular/router';

const PRIMENG = [StepsModule, ButtonModule, StepperModule];

const COMPONENTS = [
  CollectGeolocationComponent,
  CollectComplementDataComponent,
  CollectObservationDataComponent,
];

const COMMON = [RouterLink];

@Component({
  selector: 'app-offline-collect',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  templateUrl: './offline-collect.component.html',
  styles: [
    `
      .card {
        padding: 10px;
      }
    `,
  ],
})
export class OfflineCollectComponent {
  public collectService = inject(CollectService);

  public items = [{ label: 'GPS' }, { label: 'Dados' }, { label: 'Ocorrência' }];

  public activeIndex: number = checkCurrencStorageStep();

  public onActiveIndexChange(event: number): void {
    this.activeIndex = event;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }

  public insertOfflineCollectHandler(): void {
    this.collectService.storageAPlantCollectHandler();
    this.activeIndex = 0;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }
}
