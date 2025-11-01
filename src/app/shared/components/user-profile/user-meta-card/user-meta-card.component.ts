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
  public modal = inject(ModalService);

  public authenticationService = inject(AuthenticationService);

  public isOpen = false;

  public openModal(): void {
    this.isOpen = true;
  }

  public closeModal(): void {
    this.isOpen = false;
  }

  public handleSave(): void {
    this.modal.closeModal();
  }
}
