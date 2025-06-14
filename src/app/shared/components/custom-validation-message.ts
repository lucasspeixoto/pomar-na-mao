import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-custom-validation-message',
  imports: [MessageModule],
  template: `
    @if (control && control.invalid && control.touched) {
      <ul id="messages">
        @if (control.hasError('required')) {
          <p-message severity="error" variant="simple" class="mt-[3px] flex items-start">
            <span id="required">Este Campo é obrigatório!</span>
          </p-message>
        }
        @if (control.hasError('email')) {
          <p-message severity="error" variant="simple" class="mt-[3px] flex items-start">
            <span id="email">Endereço de E-mail inválido!</span>
          </p-message>
        }
        @if (control.hasError('minlength') && minLength) {
          <p-message severity="error" variant="simple" class="mt-[3px] flex items-start">
            <span id="minLength">Este campo deve ter ao menos {{ minLength }} caracteres!</span>
          </p-message>
        }
        @if (control.hasError('maxlength') && maxLength) {
          <p-message severity="error" variant="simple" class="mt-[3px] flex items-start">
            <span id="maxLength">Este campo deve ter no máximo {{ maxLength }} caracteres!</span>
          </p-message>
        }

        @if (control.hasError('min') && min) {
          <p-message severity="error" variant="simple" class="mt-[3px] flex items-start">
            <span id="min">Este campo deve ter {{ min }} como valor mínimo!</span>
          </p-message>
        }
        @if (control.hasError('max') && max) {
          <p-message severity="error" variant="simple" class="mt-[3px] flex items-start">
            <span id="max">Este campo deve ter {{ max }} como valor máximo!</span>
          </p-message>
        }

        @if (control.hasError('pattern')) {
          <p-message severity="error" variant="simple" class="mt-[3px] flex items-start">
            <span id="pattern">Padrão inválido!</span>
          </p-message>
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
