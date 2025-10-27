import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { LabelComponent } from '../../form/label/label.component';
import { InputFieldComponent } from '../../form/input/input-field.component';

@Component({
  selector: 'app-user-info-card',
  imports: [CommonModule, ButtonComponent, ModalComponent, LabelComponent, InputFieldComponent],
  templateUrl: './user-info-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoCardComponent {
  modal = inject(ModalService);

  public authenticationService = inject(AuthenticationService);

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
