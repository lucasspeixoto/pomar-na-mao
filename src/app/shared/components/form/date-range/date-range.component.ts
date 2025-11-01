/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule, // Adiciona FormsModule para inputs nativos
} from '@angular/forms';
// import { InputFieldComponent } from '../input/input-field.component'; // Removida a importação com erro

// Helper para formatar datas entre o formato de exibição (dd/mm/yyyy) e ISO (yyyy-mm-dd)
const DateFormatter = {
  toDisplayFormat: (isoDate: string): string => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  },

  toIsoFormat: (displayDate: string): string => {
    if (!displayDate) return '';
    const parts = displayDate.split(/[-\/]/);
    if (parts.length !== 3) return '';

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  },
};

@Component({
  selector: 'app-date-range',
  standalone: true,
  // Usa FormsModule para o ngModel/binding nos inputs nativos no HTML
  imports: [CommonModule, FormsModule],
  templateUrl: './date-range.component.html',
  // REGISTRO DO COMPONENTE COMO CONTROLVALUEACCESSOR
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    },
  ],
})
export class DateRangeComponent implements ControlValueAccessor, OnInit {
  @Input() placeholderStart: string = 'Data de Início';
  @Input() placeholderEnd: string = 'Data de Fim';
  @Input() className: string = '';

  // Valor do FormControl (Ex: "01/01/2023 - 31/01/2023")
  public value: string = '';

  // Mantido para compatibilidade com uso não reativo ou two-way binding
  @Output() valueChange = new EventEmitter<string>();

  // Estados internos
  public dateStartIso: string = '';
  public dateEndIso: string = '';
  public disabled: boolean = false;

  // Funções de callback do CVA
  private onChange: (value: string) => void = (value: string) => {};
  private onTouched: () => void = () => {};

  public ngOnInit(): void {
    this.parseInitialValue(this.value);
  }

  // --- Implementação ControlValueAccessor ---

  public writeValue(range: string): void {
    this.value = range || '';
    this.parseInitialValue(this.value);
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

  // --- Lógica Interna ---

  private parseInitialValue(range: string): void {
    if (range) {
      const parts = range.split(' - ').map(s => s.trim());
      // Garante que a string de exibição seja convertida para ISO
      // Verifica se os índices existem antes de acessar
      const startPart = parts[0] || '';
      const endPart = parts[1] || '';

      this.dateStartIso = DateFormatter.toIsoFormat(startPart);
      this.dateEndIso = DateFormatter.toIsoFormat(endPart);
    } else {
      this.dateStartIso = '';
      this.dateEndIso = '';
    }
  }

  /**
   * Chamada por onDate*Change, responsável por formatar o valor de saída
   * e notificar o ControlValueAccessor.
   */
  private updateRangeValue(): void {
    const startDisplay = DateFormatter.toDisplayFormat(this.dateStartIso);
    const endDisplay = DateFormatter.toDisplayFormat(this.dateEndIso);

    // O valor principal do formulário deve ser a string formatada
    if (this.dateStartIso && this.dateEndIso) {
      this.value = `${startDisplay} - ${endDisplay}`;
    } else {
      // Se um dos campos estiver vazio, o valor do range deve ser nulo/vazio
      this.value = '';
    }

    // 1. Notifica o Angular (CVA)
    this.onChange(this.value);
    // 2. Emite o evento original (@Output)
    this.valueChange.emit(this.value);

    // O onTouched deve ser chamado no blur, não no change, para validação correta.
    // Vamos confiar no (blur) no container div.
  }

  /**
   * Chamada pelo input de data inicial.
   * O $event (valor) vindo do input type="date" é a string ISO.
   */
  public onDateStartChange(isoDate: string): void {
    this.dateStartIso = isoDate;
    this.updateRangeValue();
  }

  /**
   * Chamada pelo input de data final.
   * O $event (valor) vindo do input type="date" é a string ISO.
   */
  public onDateEndChange(isoDate: string): void {
    this.dateEndIso = isoDate;
    this.updateRangeValue();
  }

  /**
   * Função para chamar o onTouched do CVA, chamada no evento blur da div container.
   */
  public onBlur(): void {
    this.onTouched();
  }
}
