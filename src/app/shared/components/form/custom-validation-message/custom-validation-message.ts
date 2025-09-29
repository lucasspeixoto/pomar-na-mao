import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-validation-message',
  imports: [],
  template: `
    @if (control && control.invalid && control.touched) {
      <ul id="messages">
        @if (control.hasError('required')) {
          <div class="mt-[3px] text-error-400 flex text-xs items-start">
            <span id="required">Este Campo é obrigatório!</span>
          </div>
        }
        @if (control.hasError('email')) {
          <div class="mt-[3px] text-error-400 flex text-xs items-start">
            <span id="email">Endereço de E-mail inválido!</span>
          </div>
        }
        @if (control.hasError('minlength') && minLength) {
          <div class="mt-[3px] text-error-400 flex text-xs items-start">
            <span id="minLength">Este campo deve ter ao menos {{ minLength }} caracteres!</span>
          </div>
        }
        @if (control.hasError('maxlength') && maxLength) {
          <div class="mt-[3px] text-error-400 flex text-xs items-start">
            <span id="maxLength">Este campo deve ter no máximo {{ maxLength }} caracteres!</span>
          </div>
        }

        @if (control.hasError('min') && min) {
          <div class="mt-[3px] text-error-400 flex text-xs items-start">
            <span id="min">Este campo deve ter {{ min }} como valor mínimo!</span>
          </div>
        }
        @if (control.hasError('max') && max) {
          <div class="mt-[3px] text-error-400 flex text-xs items-start">
            <span id="max">Este campo deve ter {{ max }} como valor máximo!</span>
          </div>
        }

        @if (control.hasError('pattern')) {
          <div class="mt-[3px] text-error-400 flex text-xs items-start">
            <span id="pattern">Padrão inválido!</span>
          </div>
        }
      </ul>
    }
  `,
  styles: [
    `
      ul {
        padding: 0;
        margin: 0;
      }
    `,
  ],
})
export class CustomValidationMessage {
  @Input({ required: true })
  public controlName!: string;

  @Input({ required: false })
  public minLength!: number;

  @Input({ required: false })
  public maxLength!: number;

  @Input({ required: false })
  public min!: number;

  @Input({ required: false })
  public max!: number;

  public controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }
}
