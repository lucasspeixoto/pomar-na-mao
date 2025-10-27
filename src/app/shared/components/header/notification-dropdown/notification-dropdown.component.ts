import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { DropdownItemComponent } from '../../ui/dropdown/dropdown-item/dropdown-item.component';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  imports: [CommonModule, RouterModule, DropdownComponent, DropdownItemComponent],
})
export class NotificationDropdownComponent {
  public isOpen = false;
  public notifying = true;

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.notifying = false;
  }

  public closeDropdown(): void {
    this.isOpen = false;
  }
}
