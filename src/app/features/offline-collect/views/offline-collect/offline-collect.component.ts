import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ObservationDataComponent } from '@collectC/observation-data/observation-data.component';
import { ComplementDataComponent } from '@collectC/complement-data/complement-data.component';
import { GeolocationComponent } from '@collectC/geolocation/geolocation.component';
import { CollectService } from '@collectS/collect/collect.service';
import { checkCurrencStorageStep } from '../../../collect/utils/localstorage';
import { OfflineLoginButtonComponent } from '@sharedC/offline-login-button/offline-login-button.component';
import { PhotoDataComponent } from '@collectC/photo-data/photo-data.component';

const PRIMENG = [StepsModule, ButtonModule, StepperModule];

const COMPONENTS = [
  GeolocationComponent,
  ComplementDataComponent,
  ObservationDataComponent,
  OfflineLoginButtonComponent,
  PhotoDataComponent,
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
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex().toString());
  }
}
