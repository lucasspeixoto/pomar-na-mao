import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  template: `
    <select
      class="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
        {{ value ? 'text-gray-800 dark:text-white/90' : 'text-gray-400 dark:text-gray-400' }} {{
        className
      }}"
      [value]="value"
      (change)="onChange($event)">
      <!-- Placeholder option -->
      <option
        value=""
        disabled
        [selected]="!value"
        class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
        {{ placeholder }}
      </option>
      <!-- Map over options -->
      @for (option of options; track $index) {
        <option [value]="option.value" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
          {{ option.label }}
        </option>
      }
    </select>
  `,
})
export class SelectComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() className: string = '';
  @Input() defaultValue: string = '';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.value && this.defaultValue) {
      this.value = this.defaultValue;
    }
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }
}
