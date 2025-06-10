import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import {
  createCollectGeolocationDataForm,
  CollectGeolocationDataFormValue,
} from '@collectCs/collect-geolocation-data-form';
import { GeolocationStore } from '@collectS/geolocation-store';
import { CustomValidationMessage } from '@sharedC/custom-validation-message';

const PRIMENG = [
  InputTextModule,
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

@Component({
  selector: 'app-geolocation-form-dialog',
  imports: [...PRIMENG, ...COMMON],
  template: `
    <section>
      <p-dialog
        header="Editar Coordenadas"
        [(visible)]="isVisible"
        [style]="{ width: '25rem' }"
        (onHide)="hideDialog()">
        <span class="p-text-secondary block mb-8">Altere aqui os dados</span>
        <form [formGroup]="collectGeolocationDataForm" class="form">
          <div class="flex flex-col justify-start gap-2 mb-4">
            <label for="latitude" class="font-semibold w-24">Latitude</label>
            <input
              pInputText
              id="latitude"
              formControlName="latitude"
              class="flex-auto"
              autocomplete="off" />
            <app-custom-validation-message controlName="latitude" />
          </div>
          <div class="flex flex-col justify-start gap-2 mb-4">
            <label for="longitude" class="font-semibold w-24">Longitude</label>
            <input
              pInputText
              id="longitude"
              formControlName="longitude"
              class="flex-auto"
              autocomplete="off" />
            <app-custom-validation-message controlName="longitude" />
          </div>
          <div class="flex flex-col justify-start gap-2 mb-4">
            <label for="gpsTimestamp" class="font-semibold w-24">Tempo GPS</label>
            <input
              readonly
              pInputText
              id="gpsTimestamp"
              formControlName="gpsTimestamp"
              class="flex-auto"
              autocomplete="off" />
          </div>
          <div class="flex justify-end gap-2">
            <p-button label="Cancelar" severity="secondary" (click)="hideDialog()" />
            <p-button label="Editar" (click)="updateGeolocationDataHandler()" />
          </div>
        </form>
      </p-dialog>
    </section>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeolocationFormDialog {
  @Input() public isVisible!: boolean;

  @Output() public dialogClosed = new EventEmitter<void>();

  public updateDataHandler = output<void>();

  private geolocationStore = inject(GeolocationStore);

  public collectGeolocationDataForm = createCollectGeolocationDataForm();

  constructor() {
    effect(() => {
      const geolocationData = this.geolocationStore.getCollectGeolocationDataFormValue();
      if (geolocationData) {
        this.collectGeolocationDataForm.setValue(geolocationData);
      }
    });
  }

  public hideDialog(): void {
    this.geolocationStore.setCollectGeolocationDataFormValue(null);
    this.collectGeolocationDataForm.reset();
    this.dialogClosed.emit();
  }

  public updateGeolocationDataHandler(): void {
    const geolocationData = this.collectGeolocationDataForm
      .value as CollectGeolocationDataFormValue;
    this.geolocationStore.setCollectGeolocationDataFormValue(geolocationData);
    this.updateDataHandler.emit();
  }
}
