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
import {
  createCollectObservationDataForm,
  CollectObservationDataFormValue,
} from '../../constants/collect-observation-data-form';
import { ObservationDataService } from '../../services/observation-data/observation-data.service';
import { OBSERVARTION_INFO_TEXT } from '../../constants/texts';
import { PopoverModule } from 'primeng/popover';

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
  selector: 'app-observation-data',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './observation-data.component.html',
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
  public observationDataService = inject(ObservationDataService);

  public collectObservationDataForm = createCollectObservationDataForm();

  public observationInfoText = OBSERVARTION_INFO_TEXT;

  public ngOnInit(): void {
    const observationData = this.observationDataService.getCollectObservationDataFormValue();

    if (observationData) {
      this.collectObservationDataForm.patchValue(observationData);
    }
  }

  public collectObservationDataFormChange$ = this.collectObservationDataForm.valueChanges.pipe(
    debounceTime(400),
    tap(value => {
      if (this.collectObservationDataForm.valid) {
        this.observationDataService.setCollectObservationDataFormValue(
          value as CollectObservationDataFormValue
        );
      }
    })
  );
}
