import { Component, inject } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { LabelComponent } from '../../form/label/label.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';

@Component({
  selector: 'app-user-address-card',
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './user-address-card.component.html',
  styles: ``,
})
export class UserAddressCardComponent {
  public authenticationService = inject(AuthenticationService);

  constructor(public modal: ModalService) {}

  isOpen = false;

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  address = {
    country: 'Brasil',
    cityState: 'Ribeirão Preto, SP',
    postalCode: '14033897',
    taxId: 'AS4568384',
  };

  handleSave(): void {
    this.modal.closeModal();
  }
}
