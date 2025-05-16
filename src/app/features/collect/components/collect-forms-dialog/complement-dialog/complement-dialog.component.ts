import { Component, EventEmitter, inject, Input, Output, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { debounceTime, tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import {
  createCollectComplementDataForm,
  type CollectComplementDataFormValue,
} from '../../../constants/collect-complement-data-form';
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
import { CustomValidationMessageComponent } from 'src/app/components/custom-validation-message/custom-validation-message';
import { lycheeVarieties } from '../../../constants/lychee-varieties';
import { ComplementDataService } from '../../../services/complement-data/complement-data.service';

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

const COMMON = [
  NgIf,
  AsyncPipe,
  CardModule,
  FormsModule,
  ReactiveFormsModule,
  CustomValidationMessageComponent,
];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-complement-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './complement-dialog.component.html',
  styleUrl: './complement-dialog.component.scss',
  providers: [...PROVIDERS],
})
export class ComplementDialogComponent {
  @Input() public isVisible!: boolean;

  @Output() dialogClosed = new EventEmitter<void>();

  @Output() updateDataHandler = new EventEmitter<void>();

  private complementDataService = inject(ComplementDataService);

  public collectComplementDataForm = createCollectComplementDataForm();

  public lycheeVarieties = lycheeVarieties;

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

  constructor() {
    effect(() => {
      const complementData = this.complementDataService.getCollectComplementDataFormValue();

      if (complementData) {
        this.collectComplementDataForm.setValue(complementData);
      }
    });
  }

  public hideDialog(): void {
    this.complementDataService.setCollectComplementDataFormValue(null);
    this.isVisible = false;
    this.dialogClosed.emit();
  }

  public updateCollectHandler(): void {
    this.updateDataHandler.emit();
  }
}
