import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() className: string = '';
  @Input() defaultValue: string = '';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  public isOpen = false;

  public ngOnInit(): void {
    if (!this.value && this.defaultValue) {
      this.value = this.defaultValue;
    }
  }

  public onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  public onFocus(): void {
    this.isOpen = true;
  }

  public onBlur(): void {
    this.isOpen = false;
  }
}
