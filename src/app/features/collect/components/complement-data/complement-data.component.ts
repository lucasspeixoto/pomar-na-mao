import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CustomValidationMessageComponent } from '../../../../components/custom-validation-message/custom-validation-message.component';
import {
  createCollectComplementDataForm,
  CollectComplementDataFormValue,
} from '../../constants/collect-complement-data-form';
import { CollectService } from '../../services/collect/collect.service';
import { ComplementDataService } from '../../services/complement-data/complement-data.service';
import { MessageModule } from 'primeng/message';
import { AsyncPipe, NgIf } from '@angular/common';
import { debounceTime, tap } from 'rxjs';
import { lycheeVarieties } from '../../constants/lychee-varieties';
import { COMPLEMENT_INFO_TEXT } from '../../constants/texts';
import { PopoverModule } from 'primeng/popover';
import { InputNumber } from 'primeng/inputnumber';

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
  CustomValidationMessageComponent,
  AsyncPipe,
  NgIf,
];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-complement-data',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './complement-data.component.html',
  styleUrl: './complement-data.component.scss',
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
export class ComplementDataComponent implements OnInit {
  public complementDataService = inject(ComplementDataService);

  public collectService = inject(CollectService);

  public collectComplementDataForm = createCollectComplementDataForm();

  public lycheeVarieties = lycheeVarieties;

  public complementDataText = COMPLEMENT_INFO_TEXT;

  public ngOnInit(): void {
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
