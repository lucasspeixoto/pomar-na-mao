import {
  Component,
  inject,
  effect,
  output,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
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
import {
  createCollectComplementDataForm,
  CollectComplementDataFormValue,
} from '@collectCs/collect-complement-data-form';
import { lycheeVarieties } from '@collectCs/lychee-varieties';
import { ComplementStore } from '@collectS/complement-store';
import { CustomValidationMessage } from '@sharedC/custom-validation-message';

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
];

const COMMON = [CardModule, FormsModule, ReactiveFormsModule, CustomValidationMessage];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-complement-form-dialog',
  imports: [...PRIMENG, ...COMMON],
  template: `
    <p-dialog
      [(visible)]="isVisible"
      [breakpoints]="{ '450px': '100vw' }"
      [style]="{ width: '50vw' }"
      header="Dados complementares"
      (onHide)="hideDialog()">
      <ng-template #content>
        <p-toast />
        <form [formGroup]="collectComplementDataForm" class="form">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="my-2">
              <label for="mass" class="block font-bold mb-3">Massa (kg)</label>
              <input class="w-full" type="text" formControlName="mass" pInputText id="mass" fluid />
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
              <input
                class="w-full"
                type="text"
                formControlName="region"
                pInputText
                id="region"
                fluid />
              <app-custom-validation-message controlName="region" />
            </div>
          </div>

          <div class="my-2">
            <label for="description" class="block font-bold mb-3">Descrição</label>
            <textarea
              class="w-full"
              rows="4"
              pTextarea
              formControlName="description"
              id="description"></textarea>
            <app-custom-validation-message controlName="description" [maxLength]="250" />
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
      ::ng-deep {
        .p-inputmask,
        .p-datepicker {
          width: 100%;
        }
      }
    `,
  ],
  providers: [...PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplementFormDialog {
  @Input() public isVisible!: boolean;

  @Output() public dialogClosed = new EventEmitter<void>();

  public updateDataHandler = output<void>();

  private complementStore = inject(ComplementStore);

  public collectComplementDataForm = createCollectComplementDataForm();

  public lycheeVarieties = lycheeVarieties;

  constructor() {
    effect(() => {
      const complementData = this.complementStore.getCollectComplementDataFormValue();
      if (complementData) {
        const updatedData = {
          ...complementData,
          plantingDate: new Date(complementData.plantingDate),
        };
        this.collectComplementDataForm.setValue(updatedData!);
      }
    });
  }

  public hideDialog(): void {
    this.complementStore.setCollectComplementDataFormValue(null);
    this.collectComplementDataForm.reset();
    this.dialogClosed.emit();
  }

  public updateCollectHandler(): void {
    const complementData = this.collectComplementDataForm.value as CollectComplementDataFormValue;
    this.complementStore.setCollectComplementDataFormValue(complementData);
    this.updateDataHandler.emit();
  }
}
