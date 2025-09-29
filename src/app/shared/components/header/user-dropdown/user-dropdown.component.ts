import { Component, inject } from '@angular/core';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownItemTwoComponent } from '../../ui/dropdown/dropdown-item/dropdown-item.component-two';
import { AuthenticationApi } from '../../../../core/auth/services/authentication-api';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  imports: [CommonModule, RouterModule, DropdownComponent, DropdownItemTwoComponent],
})
export class UserDropdownComponent {
  public authenticationService = inject(AuthenticationApi);

  public isOpen = false;

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public closeDropdown(): void {
    this.isOpen = false;
  }

  public signOut(): void {
    this.authenticationService.logoutAndRedirect();
  }
}
