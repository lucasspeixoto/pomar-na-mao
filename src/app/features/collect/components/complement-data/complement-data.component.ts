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
import { CollectService } from '@collectS/collect/collect.service';
import { ComplementDataService } from '@collectS/complement-data/complement-data.service';
import { CustomValidationMessageComponent } from '@sharedC/custom-validation-message/custom-validation-message.component';
import { FarmRegionService } from '@collectS/farm-region/farm-region.service';

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

  public farmRegionService = inject(FarmRegionService);

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
