import {
  Component,
  inject,
  effect,
  output,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import {
  createCollectObservationDataForm,
  initialCollectObservationData,
  CollectObservationDataFormValue,
} from '@collectCs/collect-observation-data-form';
import { lycheeVarieties } from '@collectCs/lychee-varieties';
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
];

const COMMON = [CardModule, FormsModule, ReactiveFormsModule];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-observation-form-dialog',
  imports: [...PRIMENG, ...COMMON],
  template: `
    <p-dialog
      [(visible)]="isVisible"
      [breakpoints]="{ '450px': '100vw' }"
      [style]="{ width: '50vw' }"
      [draggable]="false"
      header="Dados de observação"
      (onHide)="hideDialog()">
      <ng-template #content>
        <p-toast />
        <form [formGroup]="collectObservationDataForm" class="form">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
      </ng-template>

      <ng-template #footer>
        <p-button label="Cancelar" icon="pi pi-times" text (click)="hideDialog()" />
        <p-button label="Editar" icon="pi pi-check" (click)="updateCollectHandler()" />
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
      :host ::ng-deep {
        .p-inputmask,
        .p-datepicker {
          width: 100%;
        }

        .p-dialog-header {
          padding: 1rem;
        }
      }
    `,
  ],
  providers: [...PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationFormDialog {
  @Input() public isVisible!: boolean;

  @Output() public dialogClosed = new EventEmitter<void>();

  public updateDataHandler = output<void>();

  private ObservationStore = inject(ObservationStore);

  public collectObservationDataForm = createCollectObservationDataForm();

  public lycheeVarieties = lycheeVarieties;

  constructor() {
    effect(() => {
      const observationData = this.ObservationStore.getCollectObservationDataFormValue();
      if (observationData) {
        this.collectObservationDataForm.setValue(observationData);
      }
    });
  }

  public hideDialog(): void {
    this.ObservationStore.setCollectObservationDataFormValue(initialCollectObservationData);
    this.collectObservationDataForm.reset();
    this.dialogClosed.emit();
  }

  public updateCollectHandler(): void {
    const observationData = this.collectObservationDataForm
      .value as CollectObservationDataFormValue;
    this.ObservationStore.setCollectObservationDataFormValue(observationData);
    this.updateDataHandler.emit();
  }
}
