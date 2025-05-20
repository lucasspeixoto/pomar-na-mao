import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ObservationDataComponent } from '../../../collect/components/observation-data/observation-data.component';
import { ComplementDataComponent } from '../../../collect/components/complement-data/complement-data.component';
import { GeolocationComponent } from '../../../collect/components/geolocation/geolocation.component';
import { CollectService } from '../../../collect/services/collect/collect.service';
import { checkCurrencStorageStep } from '../../../collect/utils/localstorage';
import { OfflineLoginButtonComponent } from '../../../../components/offline-login-button/offline-login-button.component';

const PRIMENG = [StepsModule, ButtonModule, StepperModule];

const COMPONENTS = [
  GeolocationComponent,
  ComplementDataComponent,
  ObservationDataComponent,
  OfflineLoginButtonComponent,
];

@Component({
  selector: 'app-offline-collect',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './offline-collect.component.html',
  styles: [
    `
      .card {
        padding: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineCollectComponent {
  public collectService = inject(CollectService);

  public items = [{ label: 'GPS' }, { label: 'Dados' }, { label: 'Ocorrência' }];

  public activeIndex: number = checkCurrencStorageStep();

  public onActiveIndexChange(event: number): void {
    this.activeIndex = event;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }

  public goToPreviousStep(): void {
    this.activeIndex = this.activeIndex - 1;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }

  public goToNextStep(): void {
    this.activeIndex = this.activeIndex + 1;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }

  public insertOfflineCollectHandler(): void {
    this.collectService.storageAPlantCollectHandler();
    this.activeIndex = 0;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }
}
