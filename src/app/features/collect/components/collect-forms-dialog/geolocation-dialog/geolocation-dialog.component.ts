import { Component, effect, inject, Input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { CustomValidationMessageComponent } from 'src/app/components/custom-validation-message/custom-validation-message';
import { GeolocationFormService } from '../../../services/geolocation-form/geolocation-form.service';
import {
  createCollectGeolocationDataForm,
  type CollectGeolocationDataFormValue,
} from '../../../constants/collect-geolocation-data-form';
import { InputTextModule } from 'primeng/inputtext';

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

const COMMON = [CardModule, FormsModule, ReactiveFormsModule, CustomValidationMessageComponent];

@Component({
  selector: 'app-geolocation-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './geolocation-dialog.component.html',
  styleUrl: './geolocation-dialog.component.scss',
})
export class GeolocationDialogComponent {
  @Input() public isVisible!: boolean;

  public dialogClosed = output<void>();

  public updateDataHandler = output<void>();

  private geolocationDataService = inject(GeolocationFormService);

  public collectGeolocationDataForm = createCollectGeolocationDataForm();

  constructor() {
    effect(() => {
      const geolocationData = this.geolocationDataService.getCollectGeolocationDataFormValue();
      if (geolocationData) {
        this.collectGeolocationDataForm.setValue(geolocationData);
      }
    });
  }

  public hideDialog(): void {
    this.geolocationDataService.setCollectGeolocationDataFormValue(null);
    this.collectGeolocationDataForm.reset();
    this.isVisible = false;
    this.dialogClosed.emit();
  }

  public updateGeolocationDataHandler(): void {
    const geolocationData = this.collectGeolocationDataForm
      .value as CollectGeolocationDataFormValue;
    this.geolocationDataService.setCollectGeolocationDataFormValue(geolocationData);
    this.updateDataHandler.emit();
  }
}
