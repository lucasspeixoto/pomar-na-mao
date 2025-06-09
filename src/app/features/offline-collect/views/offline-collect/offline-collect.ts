import { PlantUploadStore } from '@collectS/plant-upload-store';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ObservationDataComponent } from '@collectC/observation-form';
import { ComplementForm } from '@collectC/complement-form';
import { DeviceGeolocation } from '@collectC/device-geolocation/device-geolocation';

import { checkCurrencStorageStep } from '../../../collect/utils/localstorage';
import { OfflineLoginButton } from '@sharedC/offline-login-button.component';
import { PhotoDataComponent } from '@collectC/photo-form';
import { CollectApi } from '@collectS/collect-api';

const PRIMENG = [StepsModule, ButtonModule, StepperModule];

const COMPONENTS = [
  DeviceGeolocation,
  ComplementForm,
  ObservationDataComponent,
  OfflineLoginButton,
  PhotoDataComponent,
];

@Component({
  selector: 'app-offline-collect',
  imports: [...PRIMENG, ...COMPONENTS],
  template: `
    <app-offline-login-button />
    <div class="">
      <div class="py-8 px-2 sm:px-10 md:px-36 lg:px-56">
        <div class="mb-4 flex w-full justify-start items-start">
          <p-steps
            class="w-full"
            [model]="items"
            [readonly]="false"
            [activeIndex]="activeIndex()"
            (activeIndexChange)="onActiveIndexChange($event)" />
        </div>

        <section class="my-2">
          @if (activeIndex() === 0) {
            <app-device-geolocation />
          }
          @if (activeIndex() === 1) {
            <app-complement-form />
          }
          @if (activeIndex() === 2) {
            <app-observation-form />
          }
          @if (activeIndex() === 3) {
            <app-photo-fom />
          }
        </section>

        <div class="w-full justify-end flex my-2 gap-2">
          @if (activeIndex() !== 0) {
            <p-button
              (click)="goToPreviousStep()"
              [link]="true"
              severity="contrast"
              label="Voltar"
              icon="pi pi-angle-left"
              iconPos="left" />
          }
          @if (activeIndex() !== 3) {
            <p-button
              (click)="goToNextStep()"
              [link]="true"
              severity="contrast"
              label="Próximo"
              icon="pi pi-angle-right"
              iconPos="right" />
          }
        </div>

        @if (activeIndex() === 3) {
          <div class="justify-center flex mt-4 gap-2">
            <p-button label="Coletar" (click)="insertOfflineCollectHandler()"></p-button>
          </div>
        }
      </div>
    </div>
  `,
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
