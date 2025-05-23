import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { ComplementDataComponent } from '@collectC/complement-data/complement-data.component';
import { GeolocationComponent } from '@collectC/geolocation/geolocation.component';
import { ObservationDataComponent } from '@collectC/observation-data/observation-data.component';
import { CollectService } from '@collectS/collect/collect.service';
import { checkCurrencStorageStep } from '@collectU/localstorage';

const PRIMENG = [StepsModule, ButtonModule];

const COMPONENTS = [GeolocationComponent, ComplementDataComponent, ObservationDataComponent];

@Component({
  selector: 'app-register',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './register.component.html',
  styles: [
    `
      .card {
        padding: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
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

  public goToPreviousStep(): void {
    this.activeIndex = this.activeIndex - 1;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }

  public goToNextStep(): void {
    this.activeIndex = this.activeIndex + 1;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }

  public insertOnlineCollectHandler(): void {
    this.collectService.insertAPlantCollectHandler();
    this.activeIndex = 0;
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex.toString());
  }
}
