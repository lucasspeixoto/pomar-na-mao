import { NgIf, AsyncPipe } from '@angular/common';
import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { debounceTime, tap } from 'rxjs';
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

const COMMON = [
  NgIf,
  AsyncPipe,
  CardModule,
  FormsModule,
  ReactiveFormsModule,
  CustomValidationMessageComponent,
];

@Component({
  selector: 'app-geolocation-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './geolocation-dialog.component.html',
  styleUrl: './geolocation-dialog.component.scss',
})
export class GeolocationDialogComponent {
  @Input() public isVisible!: boolean;

  @Output() dialogClosed = new EventEmitter<void>();

  @Output() updateDataHandler = new EventEmitter<void>();

  private geolocationDataService = inject(GeolocationFormService);

  public collectGeolocationDataForm = createCollectGeolocationDataForm();

  public collectGeolocationDataFormChange$ = this.collectGeolocationDataForm.valueChanges.pipe(
    debounceTime(400),
    tap(value => {
      if (this.collectGeolocationDataForm.valid) {
        this.geolocationDataService.setCollectGeolocationDataFormValue(
          value as CollectGeolocationDataFormValue
        );
      }
    })
  );

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
    this.isVisible = false;
    this.dialogClosed.emit();
  }

  public updateGeolocationDataHandler(): void {
    this.updateDataHandler.emit();
  }
}
