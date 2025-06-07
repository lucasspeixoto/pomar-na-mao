import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { debounceTime, tap } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { PopoverModule } from 'primeng/popover';
import { InputNumber } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import {
  createCollectComplementDataForm,
  CollectComplementDataFormValue,
} from '@collectCs/collect-complement-data-form';
import { lycheeVarieties } from '@collectCs/lychee-varieties';
import { COMPLEMENT_INFO_TEXT } from '@collectCs/texts';
import { ComplementStore } from '@collectS/complement-store';
import { CustomValidationMessage } from '@sharedC/custom-validation-message';
import { FarmRegionApi } from '@collectS/farm-region-api';

const PRIMENG = [
  InputMaskModule,
  DatePickerModule,
  ButtonModule,
  ToastModule,
  TextareaModule,
  SelectModule,
  InputTextModule,
  DialogModule,
  MessageModule,
  PopoverModule,
  InputNumber,
];

const COMMON = [
  CardModule,
  FormsModule,
  ReactiveFormsModule,
  CustomValidationMessage,
  AsyncPipe,
  NgIf,
];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-complement-form',
  imports: [...PRIMENG, ...COMMON],
  template: `
    <div class="min-h-[450px] w-full flex flex-col md:flex-row justify-between gap-2 md:gap-4">
      <ng-container *ngIf="collectComplementDataFormChange$ | async" />

      <section class="w-full md:w-1/3 hidden md:inline-block">
        <div class="flex flex-col items-center justify-start gap-1">
          <p-message class="mb-4" severity="info">
            <span class="text-md lg:text-lg text-justify font-semibold">
              {{ complementDataText }}
            </span>
          </p-message>

          <img
            class="hidden sm:block size-[70%]"
            alt="Pé de lichia"
            src="assets/images/lichia.png" />
        </div>
      </section>

      <section class="inline-block md:hidden">
        <span
          (click)="op.toggle($event)"
          class="font-semibold cursor-pointer text-md underline text-surface-300"
          >Como preencher ?</span
        >

        <p-popover #op>
          <p-message class="mb-4" severity="info">
            <span class="text-justify font-semibold">
              {{ complementDataText }}
            </span>
          </p-message>
        </p-popover>
      </section>

      <p-card class="w-full md:w-2/3" header="Dados complementares">
        <form [formGroup]="collectComplementDataForm" class="form">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="my-2">
              <label for="mass" class="block font-bold mb-3">Massa (kg)</label>
              <p-inputnumber
                class="w-full"
                mode="decimal"
                formControlName="mass"
                [useGrouping]="false"
                fluid />
              <app-custom-validation-message controlName="mass" [max]="1000" />
            </div>

            <div class="my-2">
              <label for="plantingDate" class="font-bold block mb-3">Data plantio</label>
              <p-datepicker
                appendTo="body"
                formControlName="plantingDate"
                [showIcon]="true"
                inputId="plantingDate"
                dateFormat="yy-mm-dd"
                [showOnFocus]="false" />
            </div>

            <div class="my-2">
              <label for="variety" class="block font-bold mb-3">Variedade</label>
              <p-select
                id="variety"
                formControlName="variety"
                [options]="lycheeVarieties"
                [showClear]="true"
                placeholder="Selecione a variedade"
                class="w-full" />
              <app-custom-validation-message controlName="variety" [minLength]="3" />
            </div>

            <div class="my-2">
              <label for="harvest" class="block font-bold mb-3">Safra</label>
              <input
                class="w-full"
                type="text"
                formControlName="harvest"
                pInputText
                id="harvest"
                fluid />
              <app-custom-validation-message controlName="harvest" />
            </div>

            <div class="my-2">
              <label for="lifeOfTheTree" class="block font-bold mb-3">Vida do pé</label>
              <input
                class="w-full"
                type="text"
                formControlName="lifeOfTheTree"
                pInputText
                id="lifeOfTheTree"
                fluid />
              <app-custom-validation-message controlName="lifeOfTheTree" [maxLength]="10" />
            </div>

            <div class="my-2">
              <label for="region" class="block font-bold mb-3">Região</label>
              <p-select
                [editable]="true"
                class="w-full"
                appendTo="body"
                [options]="farmRegionApi.uniqueRegions()"
                formControlName="region"
                [showClear]="true"
                placeholder="Selecione a região" />
            </div>
          </div>

          <div class="mt-2">
            <label for="description" class="block font-bold mb-3">Descrição</label>
            <textarea
              class="w-full"
              rows="10"
              pTextarea
              formControlName="description"
              id="description"></textarea>
            <app-custom-validation-message controlName="description" [maxLength]="250" />
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .p-card {
        margin-top: 0;
      }

      :host ::ng-deep .p-frozen-column {
        font-weight: bold;
      }

      :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
      }

      ::ng-deep {
        .p-inputmask,
        .p-datepicker {
          width: 100%;
        }
      }

      @media (max-width: 450px) {
        .p-iconfield {
          width: 100%;
        }
      }
    `,
  ],
  providers: [...PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplementForm implements OnInit {
  public complementDataService = inject(ComplementStore);

  public farmRegionApi = inject(FarmRegionApi);

  public collectComplementDataForm = createCollectComplementDataForm();

  public lycheeVarieties = lycheeVarieties;

  public complementDataText = COMPLEMENT_INFO_TEXT;

  public ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const complementData = this.complementDataService.getCollectComplementDataFormValue();

    if (complementData) {
      this.collectComplementDataForm.setValue(complementData);
    }
  }

  public collectComplementDataFormChange$ = this.collectComplementDataForm.valueChanges.pipe(
    debounceTime(400),
    tap(value => {
      if (this.collectComplementDataForm.valid) {
        this.complementDataService.setCollectComplementDataFormValue(
          value as CollectComplementDataFormValue
        );
      }
    })
  );
}
