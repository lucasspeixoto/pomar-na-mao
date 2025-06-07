import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { PopoverModule } from 'primeng/popover';
import {
  createCollectObservationDataForm,
  CollectObservationDataFormValue,
} from '@collectCs/collect-observation-data-form';
import { OBSERVARTION_INFO_TEXT } from '@collectCs/texts';
import { ObservationStore } from '@collectS/observation-store';

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
  CheckboxModule,
  PopoverModule,
];

const COMMON = [CardModule, FormsModule, ReactiveFormsModule, AsyncPipe, NgIf];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-observation-form',
  imports: [...PRIMENG, ...COMMON],
  template: `
    <div class="min-h-[450px] w-full flex flex-col md:flex-row justify-between gap-2 md:gap-4">
      <ng-container *ngIf="collectObservationDataFormChange$ | async" />

      <section class="w-full md:w-1/3 hidden md:inline-block">
        <div class="flex flex-col items-center justify-start gap-1">
          <p-message class="mb-4" severity="info">
            <span class="text-md lg:text-lg text-justify font-semibold">
              {{ observationInfoText }}
            </span>
          </p-message>

          <img
            class="hidden sm:block size-[70%]"
            alt="Items de observação"
            src="assets/images/observation-data-image.png" />
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
              {{ observationInfoText }}
            </span>
          </p-message>
        </p-popover>
      </section>

      <p-card class="w-full md:w-2/3" header="Observações">
        <form [formGroup]="collectObservationDataForm" class="form">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
            <div class="my-6">
              <p-checkbox
                formControlName="stick"
                value="Galho Seco"
                inputId="stick"
                [binary]="true" />
              <label for="stick" class="ml-2">Galho Seco</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="brokenBranch"
                value="Galho Quebrado"
                inputId="brokenBranch"
                [binary]="true" />
              <label for="brokenBranch" class="ml-2">Galho Quebrado</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="vineGrowing"
                value="Cipó no pé"
                inputId="vineGrowing"
                [binary]="true" />
              <label for="vineGrowing" class="ml-2">Cipó crescendo</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="burntBranch"
                value="Queimado"
                inputId="burntBranch"
                [binary]="true" />
              <label for="burntBranch" class="ml-2">Queimado</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="struckByLightning"
                value="Atingido por raio"
                inputId="struckByLightning"
                [binary]="true" />
              <label for="struckByLightning" class="ml-2">Atingido por raio</label>
            </div>

            <div class="my-6">
              <p-checkbox formControlName="drill" value="Broca" inputId="drill" [binary]="true" />
              <label for="drill" class="ml-2">Broca</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="anthill"
                value="Formigueiro"
                inputId="anthill"
                [binary]="true" />
              <label for="anthill" class="ml-2">Formigueiro</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="inExperiment"
                value="Em experimento/teste"
                inputId="inExperiment"
                [binary]="true" />
              <label for="inExperiment" class="ml-2">Em experimento/teste</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="weedsInTheBasin"
                value="Mato na bacia"
                inputId="weedsInTheBasin"
                [binary]="true" />
              <label for="weedsInTheBasin" class="ml-2">Mato na bacia</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="fertilizationOrManuring"
                value="Parada de pulverização/adubação"
                inputId="fertilizationOrManuring"
                [binary]="true" />
              <label for="fertilizationOrManuring" class="ml-2"
                >Parada de pulverização/adubação</label
              >
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="mites"
                value="Presença de ácaro"
                inputId="mites"
                [binary]="true" />
              <label for="mites" class="ml-2">Presença de ácaro</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="thrips"
                value="Presença de tripes"
                inputId="thrips"
                [binary]="true" />
              <label for="thrips" class="ml-2">Presença de tripes</label>
            </div>

            <div class="my-6">
              <p-checkbox
                formControlName="emptyCollectionBoxNear"
                value="Caixa vazia perto"
                inputId="emptyCollectionBoxNear"
                [binary]="true" />
              <label for="emptyCollectionBoxNear" class="ml-2">Caixa de colheita vazia perto</label>
            </div>
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .p-card {
        margin-top: 0;
        height: auto;
        padding: 0;
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
export class ObservationDataComponent implements OnInit {
  public ObservationStore = inject(ObservationStore);

  public collectObservationDataForm = createCollectObservationDataForm();

  public observationInfoText = OBSERVARTION_INFO_TEXT;

  public ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const observationData = this.ObservationStore.getCollectObservationDataFormValue();

    if (observationData) {
      this.collectObservationDataForm.patchValue(observationData);
    }
  }

  public collectObservationDataFormChange$ = this.collectObservationDataForm.valueChanges.pipe(
    debounceTime(400),
    tap(value => {
      if (this.collectObservationDataForm.valid) {
        this.ObservationStore.setCollectObservationDataFormValue(
          value as CollectObservationDataFormValue
        );
      }
    })
  );
}
