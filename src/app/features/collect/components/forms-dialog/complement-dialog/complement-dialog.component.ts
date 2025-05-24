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
import { ComplementDataService } from '@collectS/complement-data/complement-data.service';
import { CustomValidationMessageComponent } from '@sharedC/custom-validation-message/custom-validation-message.component';

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

const COMMON = [CardModule, FormsModule, ReactiveFormsModule, CustomValidationMessageComponent];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-complement-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './complement-dialog.component.html',
  styleUrl: './complement-dialog.component.scss',
  providers: [...PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplementDialogComponent {
  @Input() public isVisible!: boolean;

  @Output() public dialogClosed = new EventEmitter<void>();

  public updateDataHandler = output<void>();

  private complementDataService = inject(ComplementDataService);

  public collectComplementDataForm = createCollectComplementDataForm();

  public lycheeVarieties = lycheeVarieties;

  constructor() {
    effect(() => {
      const complementData = this.complementDataService.getCollectComplementDataFormValue();
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
    this.complementDataService.setCollectComplementDataFormValue(null);
    this.collectComplementDataForm.reset();
    this.dialogClosed.emit();
  }

  public updateCollectHandler(): void {
    const complementData = this.collectComplementDataForm.value as CollectComplementDataFormValue;
    this.complementDataService.setCollectComplementDataFormValue(complementData);
    this.updateDataHandler.emit();
  }
}
