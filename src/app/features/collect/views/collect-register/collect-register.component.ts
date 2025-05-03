import { Component, inject } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { CollectGeolocationComponent } from '../../components/collect-geolocation/collect-geolocation.component';
import { CollectComplementDataComponent } from '../../components/collect-complement-data/collect-complement-data.component';
import { CollectObservationDataComponent } from '../../components/collect-observation-data/collect-observation-data.component';
import { checkCurrencStorageStep } from '../../utils/localstorage';
import { ButtonModule } from 'primeng/button';
import { CollectService } from '../../services/collect/collect.service';

const PRIMENG = [StepsModule, ButtonModule];

const COMPONENTS = [
  CollectGeolocationComponent,
  CollectComplementDataComponent,
  CollectObservationDataComponent,
];

@Component({
  selector: 'app-collect-register',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './collect-register.component.html',
  styles: [
    `
      .card {
        padding: 10px;
      }
    `,
  ],
})
export class CollectRegisterComponent {
  public collectService = inject(CollectService);

  public items = [{ label: 'GPS' }, { label: 'Dados' }, { label: 'Ocorrência' }];

  public activeIndex: number = checkCurrencStorageStep();

  public onActiveIndexChange(event: number): void {
    this.activeIndex = event;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }
}
