import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAddressCardComponent {
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
