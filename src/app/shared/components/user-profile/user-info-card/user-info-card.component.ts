import { Component, inject } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { AuthenticationApi } from '../../../../core/auth/services/authentication-api';

@Component({
  selector: 'app-user-info-card',
  imports: [CommonModule, ButtonComponent, ModalComponent],
  templateUrl: './user-info-card.component.html',
  styles: ``,
})
export class UserInfoCardComponent {
  public authenticationService = inject(AuthenticationApi);

  constructor(public modal: ModalService) {}

  isOpen = false;

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  handleSave(): void {
    this.modal.closeModal();
  }
}
