/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: Option[] = [];

  @Input() placeholder: string = 'Selecione uma opção';

  @Input() className: string = '';

  @Input() defaultValue: string = '';

  @Output() valueChange = new EventEmitter<string>();

  private cd = inject(ChangeDetectorRef);

  public value: string = '';

  public disabled: boolean = false;

  public isOpen = false;

  private onChange: (value: string) => void = (value: string) => {};

  private onTouched: () => void = () => {};

  public ngOnInit(): void {
    if (!this.value && this.defaultValue) {
      this.value = this.defaultValue;
    }
  }

  public writeValue(value: string): void {
    this.value = value || '';
    this.cd.markForCheck();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.value = value;

    this.onChange(value);

    this.onTouched();

    this.valueChange.emit(value);
  }

  public onFocus(): void {
    this.isOpen = true;
  }

  public onBlur(): void {
    this.isOpen = false;
    this.onTouched();
  }
}
