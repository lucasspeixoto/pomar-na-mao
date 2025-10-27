/* eslint-disable no-useless-escape */
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InputFieldComponent } from '../input/input-field.component';

// Utilitário simples para formatação de data (simula um pipe ou serviço)
const DateFormatter = {
  // Converte YYYY-MM-DD (HTML input) para DD/MM/YYYY
  toDisplayFormat: (isoDate: string): string => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  },

  // Converte DD/MM/YYYY para YYYY-MM-DD (HTML input)
  toIsoFormat: (displayDate: string): string => {
    if (!displayDate) return '';
    const parts = displayDate.split(/[-\/]/); // Aceita '/' ou '-'
    if (parts.length !== 3) return '';
    // Assume dd/mm/yyyy e converte para yyyy-mm-dd
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  },
};

@Component({
  selector: 'app-date-range',
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './date-range.component.html',
})
export class DateRangeComponent implements OnInit {
  @Input() placeholderStart: string = 'Data de Início';
  @Input() placeholderEnd: string = 'Data de Fim';
  @Input() className: string = '';
  @Input() value: string = '';

  // --- Output ---
  // Retorna o valor no formato dd/mm/yyyy - dd/mm/yyyy
  @Output() valueChange = new EventEmitter<string>();

  // --- Propriedades Internas ---
  public dateStartIso: string = ''; // YYYY-MM-DD (para o input[type="date"])
  public dateEndIso: string = ''; // YYYY-MM-DD (para o input[type="date"])

  public ngOnInit(): void {
    this.parseInitialValue(this.value);
  }

  // Divide o valor de input (dd/mm/yyyy - dd/mm/yyyy)
  private parseInitialValue(range: string): void {
    if (range) {
      const [start, end] = range.split(' - ').map(s => s.trim());
      this.dateStartIso = DateFormatter.toIsoFormat(start);
      this.dateEndIso = DateFormatter.toIsoFormat(end);
    }
  }

  // Atualiza o valor final do range e emite o evento
  private updateRangeValue(): void {
    const startDisplay = DateFormatter.toDisplayFormat(this.dateStartIso);
    const endDisplay = DateFormatter.toDisplayFormat(this.dateEndIso);

    // Só emite se ambas as datas estiverem preenchidas e forem válidas
    if (this.dateStartIso && this.dateEndIso) {
      this.value = `${startDisplay} - ${endDisplay}`;
      this.valueChange.emit(this.value);
    } else {
      this.value = '';
      this.valueChange.emit('');
    }
  }

  public onDateStartChange(isoDate: string | number): void {
    // O InputFieldComponent retorna string|number, mas para type="date" é string
    this.dateStartIso = isoDate as string;
    this.updateRangeValue();
  }

  public onDateEndChange(isoDate: string | number): void {
    this.dateEndIso = isoDate as string;
    this.updateRangeValue();
  }
}
