import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { ComplementForm } from '@collectC/register/complement/complement-form';
import { DeviceGeolocation } from '@collectC/register/geolocation/device-geolocation';
import { ObservationDataComponent } from '@collectC/register/observation/observation-form';
import { CollectApi } from '@collectS/collect-api';
import { checkCurrencStorageStep } from '@collectU/localstorage';
import { PhotoDataComponent } from '@collectC/register/photo-form';
import { PlantUploadStore } from '@collectS/plant-upload-store';

const PRIMENG = [StepsModule, ButtonModule];

const COMPONENTS = [
  DeviceGeolocation,
  ComplementForm,
  ObservationDataComponent,
  PhotoDataComponent,
];

@Component({
  selector: 'app-register',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  public collectService = inject(CollectApi);

  public PlantUploadStore = inject(PlantUploadStore);

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
    this.PlantUploadStore.resetSelectedImage();
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', this.activeIndex().toString());
  }
}
