import { Component, inject, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { CollectGeolocationComponent } from '../../components/collect-geolocation/collect-geolocation.component';
import { CollectComplementDataComponent } from '../../components/collect-complement-data/collect-complement-data.component';
import { CollectObservationDataComponent } from '../../components/collect-observation-data/collect-observation-data.component';
import { checkCurrencStorageStep } from '../../utils/localstorage';
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
export class CollectRegisterComponent implements OnInit {
  public collectService = inject(CollectService);

  public items = [{ label: 'GPS' }, { label: 'Dados' }, { label: 'Ocorrência' }];

  public activeIndex: number = checkCurrencStorageStep();

  public ngOnInit(): void {
    this.collectService.resetCollectData();
  }

  public onActiveIndexChange(event: number): void {
    this.activeIndex = event;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }

  public insertOnlineCollectHandler(): void {
    this.collectService.insertAPlantCollectHandler();
    this.activeIndex = 0;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }
}
