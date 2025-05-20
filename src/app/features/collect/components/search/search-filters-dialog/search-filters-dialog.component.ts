import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
import { SearchFiltersComponent } from '../search-filters/search-filters.component';

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
  selector: 'app-search-filters-dialog',
  imports: [...PRIMENG, ...COMMON, SearchFiltersComponent],
  template: `
    <p-dialog
      [visible]="isVisible()"
      [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
      [style]="{ width: '50vw' }"
      [draggable]="true"
      [showHeader]="true"
      [closable]="true"
      (onHide)="hideDialog()">
      <ng-template #content>
        <app-search-filters (hideDialog)="hideDialog()" />
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
      :host ::ng-deep .p-dialog-header {
        padding: 12px 12px 0 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersDialogComponent {
  public isVisible = input.required<boolean>();

  public dialogClosed = output<void>();

  public hideDialog(): void {
    this.dialogClosed.emit();
  }
}
