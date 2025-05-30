import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { ComplementDataComponent } from '@collectC/complement-data/complement-data.component';
import { GeolocationComponent } from '@collectC/geolocation/geolocation.component';
import { ObservationDataComponent } from '@collectC/observation-data/observation-data.component';
import { CollectService } from '@collectS/collect/collect.service';
import { checkCurrencStorageStep } from '@collectU/localstorage';
import { PhotoDataComponent } from '@collectC/photo-data/photo-data.component';

const PRIMENG = [StepsModule, ButtonModule];

const COMPONENTS = [
  GeolocationComponent,
  ComplementDataComponent,
  ObservationDataComponent,
  PhotoDataComponent,
];

@Component({
  selector: 'app-register',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public collectService = inject(CollectService);

  public items = [{ label: 'GPS' }, { label: 'Dados' }, { label: 'Ocorrência' }, { label: 'Foto' }];

  public activeIndex = signal(checkCurrencStorageStep());

  public ngOnInit(): void {
    this.collectService.resetCollectData();
  }

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

  public insertOnlineCollectHandler(): void {
    this.collectService.insertAPlantCollectHandler();
    this.activeIndex.set(0);
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex().toString());
  }
}
