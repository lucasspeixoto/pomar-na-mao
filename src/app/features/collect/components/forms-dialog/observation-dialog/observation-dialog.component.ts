import { Component, inject, effect, output, ChangeDetectionStrategy, input } from '@angular/core';
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
import { ObservationDataService } from '@collectS/observation-data/observation-data.service';

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
  selector: 'app-observation-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './observation-dialog.component.html',
  styleUrl: './observation-dialog.component.scss',
  providers: [...PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationDialogComponent {
  public isVisible = input.required<boolean>();

  public dialogClosed = output<void>();

  public updateDataHandler = output<void>();

  private observationDataService = inject(ObservationDataService);

  public collectObservationDataForm = createCollectObservationDataForm();

  public lycheeVarieties = lycheeVarieties;

  constructor() {
    effect(() => {
      const observationData = this.observationDataService.getCollectObservationDataFormValue();
      if (observationData) {
        this.collectObservationDataForm.setValue(observationData);
      }
    });
  }

  public hideDialog(): void {
    this.observationDataService.setCollectObservationDataFormValue(initialCollectObservationData);
    this.collectObservationDataForm.reset();
    this.dialogClosed.emit();
  }

  public updateCollectHandler(): void {
    const observationData = this.collectObservationDataForm
      .value as CollectObservationDataFormValue;
    this.observationDataService.setCollectObservationDataFormValue(observationData);
    this.updateDataHandler.emit();
  }
}
