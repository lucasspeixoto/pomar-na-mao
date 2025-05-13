import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { CollectSearchFiltersComponent } from '../collect-search-filters/collect-search-filters.component';

const PRIMENG = [
  SelectModule,
  InputTextModule,
  RadioButtonModule,
  ButtonModule,
  AccordionModule,
  CheckboxModule,
  DividerModule,
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

const COMMON = [FormsModule];

@Component({
  selector: 'app-collect-search-filters-dialog',
  imports: [...PRIMENG, ...COMMON, CollectSearchFiltersComponent],
  template: `
    <p-dialog
      [(visible)]="isVisible"
      [breakpoints]="{ '450px': '100vw' }"
      [style]="{ width: '70vw' }"
      [draggable]="false"
      [resizable]="false"
      header="Filtros"
      [modal]="true"
      (onHide)="hideDialog()">
      <ng-template #content>
        <app-collect-search-filters />
      </ng-template>
    </p-dialog>
  `,
})
export class CollectSearchFiltersDialogComponent {
  @Input() public isVisible!: boolean;

  @Output() dialogClosed = new EventEmitter<void>();

  public hideDialog(): void {
    this.isVisible = false;
    this.dialogClosed.emit();
  }
}
