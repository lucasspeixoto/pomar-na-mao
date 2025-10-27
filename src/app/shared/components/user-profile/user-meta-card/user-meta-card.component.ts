import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../ui/modal/modal.component';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';

@Component({
  selector: 'app-user-meta-card',
  imports: [CommonModule, ModalComponent],
  templateUrl: './user-meta-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMetaCardComponent {
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
    // Handle save logic here
    this.modal.closeModal();
  }
}
